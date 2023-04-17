export const getSymbols = async (signal: AbortSignal)  => {

  const uri : string = process.env.REACT_APP_API_URI + 'stock/symbol' + '?exchange=US&token=' + process.env.REACT_APP_FINHUB_SECRET 

  let response = await fetch(
    uri, {
    method: 'GET',
    signal: signal
  }).then(
    res => res.json()
  ).catch(
    err => {return err}
  )
  
  return response;
}