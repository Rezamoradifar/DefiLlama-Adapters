const CONTRACT = '0xDCcc0561b36809454584ED1038824ca06B86c1d6' // ArbiSmartV2, Polygon
const USDT = '0xc2132D05D31c914a87C6611C10748AEb04B58e8F' // Tether (Polygon)

async function tvl(api) {
  // totalAssets() = liquid USDT balance + capital currently deployed into
  // Polymarket Conditional Token positions (same collateral unit). Reading
  // it directly from the contract avoids under-counting TVL if a future
  // deployment on matching USDC.e collateral does deploy into positions.
  const totalAssets = await api.call({
    target: CONTRACT,
    abi: 'function totalAssets() view returns (uint256)',
  })
  api.add(USDT, totalAssets)
}

module.exports = {
  methodology:
    "TVL is totalAssets() read directly from the verified ArbiSmartV2 contract on Polygon: the USDT held by the contract plus any capital currently deployed into Polymarket Conditional Token positions.",
  polygon: {
    tvl,
  },
}
