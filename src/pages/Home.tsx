import { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import DatePicker from "react-datepicker";

export const Home = () => {

  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [startDate, endDate] = dateRange;

  return (
    <Row>
      <Col xs={5} >
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
                <Form.Select className='input arrow'>
                  <option>Open Prices</option>
                  <option>High Prices</option>
                  <option>Low Prices</option>
                  <option>Close Prices</option>
                </Form.Select>
              </Col>
            </Row>

          </Card.Body>
        </Card>

        <Card className='px-3 py-2 m-5 card-background'>
          <Card.Body>
            <Form.Control 
              type="text" 
              placeholder="Normal text" 
              className='input search mb-4'
            />
            
            <div className='card-scrolleable'>
            <Row className='pb-1 mb-3 border-bottom border-dark'>
              <Col xs={2}>
                <img 
                  src={'https://upload.wikimedia.org/wikipedia/commons/1/1b/Apple_logo_grey.svg'}
                  width='25px'
                  className='d-block my-auto mx-auto'  
                />
              </Col>
              <Col xs={8}>
                <small className='text-white'>
                  AAPL NASDAQ/NMS (GLOBAL MARKET)
                </small>
                <br></br>
                <small className='text-white'>
                  Technology Hardware and Equipment
                </small>
              </Col>
              <Col xs={2}>
                <Form.Check 
                  type='checkbox'
                  id=''
                  className='accent-green text-center'
                />
              </Col>
            </Row>

            <Row className='pb-1 mb-3 border-bottom border-dark'>
              <Col xs={2}>
                <img 
                  src={'https://upload.wikimedia.org/wikipedia/commons/1/1b/Apple_logo_grey.svg'}
                  width='25px'
                  className='d-block my-auto mx-auto'  
                />
              </Col>
              <Col xs={8}>
                <small className='text-white'>
                  AAPL NASDAQ/NMS (GLOBAL MARKET)
                </small>
                <br></br>
                <small className='text-white'>
                  Technology Hardware and Equipment
                </small>
              </Col>
              <Col xs={2}>
                <Form.Check 
                  type='checkbox'
                  id=''
                  className='accent-green text-center'
                />
              </Col>
            </Row>

            <Row className='pb-1 mb-3 border-bottom border-dark'>
              <Col xs={2}>
                <img 
                  src={'https://upload.wikimedia.org/wikipedia/commons/1/1b/Apple_logo_grey.svg'}
                  width='25px'
                  className='d-block my-auto mx-auto'  
                />
              </Col>
              <Col xs={8}>
                <small className='text-white'>
                  AAPL NASDAQ/NMS (GLOBAL MARKET)
                </small>
                <br></br>
                <small className='text-white'>
                  Technology Hardware and Equipment
                </small>
              </Col>
              <Col xs={2}>
                <Form.Check 
                  type='checkbox'
                  id=''
                  className='accent-green text-center'
                />
              </Col>
            </Row>

            <Row className='pb-1 mb-3 border-bottom border-dark'>
              <Col xs={2}>
                <img 
                  src={'https://upload.wikimedia.org/wikipedia/commons/1/1b/Apple_logo_grey.svg'}
                  width='25px'
                  className='d-block my-auto mx-auto'  
                />
              </Col>
              <Col xs={8}>
                <small className='text-white'>
                  AAPL NASDAQ/NMS (GLOBAL MARKET)
                </small>
                <br></br>
                <small className='text-white'>
                  Technology Hardware and Equipment
                </small>
              </Col>
              <Col xs={2}>
                <Form.Check 
                  type='checkbox'
                  id=''
                  className='accent-green text-center'
                />
              </Col>
            </Row>

            <Row className='pb-1 mb-3 border-bottom border-dark'>
              <Col xs={2}>
                <img 
                  src={'https://upload.wikimedia.org/wikipedia/commons/1/1b/Apple_logo_grey.svg'}
                  width='25px'
                  className='d-block my-auto mx-auto'  
                />
              </Col>
              <Col xs={8}>
                <small className='text-white'>
                  AAPL NASDAQ/NMS (GLOBAL MARKET)
                </small>
                <br></br>
                <small className='text-white'>
                  Technology Hardware and Equipment
                </small>
              </Col>
              <Col xs={2}>
                <Form.Check 
                  type='checkbox'
                  id=''
                  className='accent-green text-center'
                />
              </Col>
            </Row>
            </div>

          </Card.Body>
        </Card>

      </Col>
      <Col xs={7} >
      </Col>
    </Row>
  )
}