const ADDRESS = '0xDCcc0561b36809454584ED1038824ca06B86c1d6'
const USDT = '0xc2132D05D31c914a87C6611C10748AEb04B58e8F'

async function tvl(api) {
  const totalAssets = await api.call({
    target: ADDRESS,
    abi: 'function totalAssets() view returns (uint256)',
  })
  api.add(USDT, totalAssets)
  return api.getBalances()
}

module.exports = {
  methodology:
    "TVL is the contract's tracked totalAssets(): USDT currently held by the contract plus USDT deployed into Polymarket outcome-token positions for arbitrage. Excludes protocol fees already paid out to stakers.",
  polygon: {
    tvl,
  },
}
