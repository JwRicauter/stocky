/* react */
import { useEffect, useState } from 'react';

/* services */
import { getCandles } from '../services/api';

/* third part libraries */
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

type Props = {
  dateRange: [Date | null, Date | null],
  priceType: string,
  selectedSymbols: string[]
}


export const Charts = ({dateRange, priceType, selectedSymbols} : Props) => {


  const [chartsData, setChartsData] = useState<any[]>([]);

  /** 
  * Function that return an array of days 
  *
  * @param s Start date 
  * @param e End date
  * @return a Array of days between s and e (inclusive)
  */
  const getDaysArray = (s,e) => {
    let a : any[]; let d : Date;
    for( a=[],d=new Date(s);d<=new Date(e);d.setDate(d.getDate()+1)){ 
      let newDate = new Date(d);
      a.push(((newDate.getMonth()+1)+'/'+newDate.getDate()+'/'+newDate.getFullYear()));
    }
    return a;
  }

  /**
   * Helper that translate the api information into an arrray readable for
   * the chart library
   * 
   * @param data API information about the Stocks symbols
   * @param symbols Array of symbols
   * @param priceType Price type to filter
  */
  const prepareChart = (data, symbols, priceType) => {
    let code = {
      'Open Prices': 'o',
      'High Prices': 'h',
      'Low Prices': 'l',
      'Close Prices': 'c',
    }
    let priceTypeCode = code[priceType]
    let dates = getDaysArray(dateRange[0], dateRange[1]);
    let arrayPrepared : any = []
    for (let i = 0; i < 3; i++) {
      let symbol = symbols[i]
      let dataForSymbol = data[i]
      if (dataForSymbol?.s == 'ok') {
        for (let j = 0; j < dates.length; j++) {
          let aux = {
            'date': dates[j],
            'price_type': priceType,
            'stock': j < dataForSymbol[priceTypeCode].length ? dataForSymbol[priceTypeCode][j] : 0
          }
          aux[symbol] =  j < dataForSymbol[priceTypeCode].length ? dataForSymbol[priceTypeCode][j] : 0
          arrayPrepared.push(aux);
        }
      }
    }
    setChartsData(arrayPrepared);
    
  }

  useEffect(() => {

    const controller = new AbortController();
		const signal = controller.signal;
    if (selectedSymbols.length > 0 ) {

      let from  = dateRange[0] && parseInt((dateRange[0].getTime() / 1000).toFixed(0))
      let to  = dateRange[1] && parseInt((dateRange[1].getTime() / 1000).toFixed(0))
      from && to && getCandles(
        signal, 
        selectedSymbols, 
        from.toString(),
        to.toString()
      ).then(res => {
        prepareChart(res, selectedSymbols, priceType)
      })
    
    }

    return () => {
      controller.abort();
    };

  }, [dateRange, selectedSymbols])


  return(
    chartsData.length > 0 ? <ResponsiveContainer width="100%" height="70%" className='mt-5'>
      <LineChart
        width={500}
        height={300}
        data={chartsData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" name='date' minTickGap={30} type="category" allowDuplicatedCategory={false}/>
        <YAxis dataKey='stock'/>
        <Tooltip />
        <Legend />
        {
          selectedSymbols.map( (d, index) => {

            return (

              <Line type="monotone" dataKey={d} stroke="#8884d8" activeDot={{ r: 8 }} />
            )
          })
        }
        
      </LineChart>
    </ResponsiveContainer> : <></>
  )
}