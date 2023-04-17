
/* bootstrap libraries */
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

/* third part libraries */
import DatePicker from "react-datepicker";


type Props = {
  dateRange: [Date | null, Date | null], 
  setDateRange: React.Dispatch<React.SetStateAction<[Date | null, Date | null]>>, 
  priceType: string, 
  setPriceType: React.Dispatch<React.SetStateAction<string>>
}

export const Inputs = ({dateRange, setDateRange, priceType, setPriceType}: Props) => {

  const [startDate, endDate] = dateRange;

  return (
    <Card className='px-3 py-2 m-5 card-background'>
      <Card.Body>
        <Row>
          <Col xs={3}>
            <p className='text-white'>
              Dates range
            </p>
          </Col>
          <Col xs={9}>
          <DatePicker
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            onChange={(update) => {
              setDateRange(update);
            }}
            className='input d-block mx-auto p-1 w-100'
            withPortal
          />
          </Col>
        </Row>
        <Row>
          <Col xs={3}>
            <p className='text-white'>
              Price types
            </p>
          </Col>
          <Col xs={9}>
            <Form.Select data-testid="select" id='select' onChange={e => setPriceType(e.target.value)} className='input arrow'>
              <option data-testid="select-option">Open Prices</option>
              <option data-testid="select-option">High Prices</option>
              <option data-testid="select-option">Low Prices</option>
              <option data-testid="select-option">Close Prices</option>
            </Form.Select>
            
          </Col>
        </Row>

      </Card.Body>
    </Card>
  )
}