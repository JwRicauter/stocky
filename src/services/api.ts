export const getSymbols = async (signal: AbortSignal) => {
  const uri: string =
    process.env.REACT_APP_API_URI +
    'stock/symbol' +
    '?exchange=US&token=' +
    process.env.REACT_APP_FINHUB_SECRET

  let response = await fetch(uri, {
    method: 'GET',
    signal: signal,
  })
    .then((res) => res.json())
    .catch((err) => {
      return err
    })

  return response
}

export const getCandles = async (
  signal: AbortSignal,
  symbols: string[],
  from: string,
  to: string
) => {
  let promises = await symbols.map(async (symbol) => {
    const uri: string =
      process.env.REACT_APP_API_URI +
      'stock/candle?symbol=' +
      symbol +
      '&resolution=D&from=' +
      from +
      '&to=' +
      to +
      '&token=' +
      process.env.REACT_APP_FINHUB_SECRET

    let response = await fetch(uri, {
      method: 'GET',
      signal: signal,
    })
      .then((res) => res.json())
      .catch((err) => {
        return err
      })
    return response
  })

  return Promise.all(promises)
}
