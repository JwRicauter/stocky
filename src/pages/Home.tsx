import { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import DatePicker from "react-datepicker";
import { getSymbols } from '../services/api';
import { Inputs } from '../components/Inputs';
import { Symbols } from '../components/Symbols';
import { Charts } from '../components/Charts';



export const Home = () => {

  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [priceType, setPriceType] = useState<string>('Open Prices')
  const [selectedSymbols, setSelectedSymbols] = useState<string[]>([])


  useEffect(() => {

    let today = new Date();
    let oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    setDateRange([oneWeekAgo, today])

  }, [])

  return (
    <Row>
      <Col xs={5} >
        <Inputs 
          dateRange={dateRange} 
          setDateRange={setDateRange}
          priceType={priceType}
          setPriceType={setPriceType}
        />
        <Symbols 
          selectedSymbols={selectedSymbols}
          setSelectedSymbols={setSelectedSymbols}
        />
      </Col>
      <Col xs={7} >
        <Charts 
          dateRange={dateRange}
          priceType={priceType}
          selectedSymbols={selectedSymbols}
        />
      </Col>
    </Row>
  )
}