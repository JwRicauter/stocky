/* react */
import { useState, useEffect } from 'react';

/* bootstrap components */
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

/* services */
import { getSymbols } from '../services/api';

/* third part libraries */
import ReactPaginate from 'react-paginate';

type Props = {
  selectedSymbols: string[],
  setSelectedSymbols: React.Dispatch<React.SetStateAction<string[]>>
}

export const Symbols = ({selectedSymbols, setSelectedSymbols} : Props) => {

  let itemsPerPage = 10;


  const [symbols, setSymbols] = useState<Record<string, string>[]>([])
  const [filteredSymbols, setFilteredSymbols] = useState<Record<string, string>[]>([])
  const [currentItems, setCurrentItems] = useState<Record<string, string>[]>([])
  const [pageCount, setPageCount] = useState<number>(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [endOffset, setEndOffset] = useState<number>(itemsPerPage);
  const [textSearch, setTextSearch] = useState<string>('')


  /**
   * Pagination handler
   * 
   * @param event Synthetic event of new page click
   */
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredSymbols.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };


  /**
   * Function that manage the symbols array state
   * 
   * @param event Synthetic event of checkbox toggle
   */
  const toggleCheckbox = (event) => {

    let symbol = event.target.id;
    if (selectedSymbols.includes(symbol)) {
      let array = selectedSymbols.filter(item => item !== symbol)
      setSelectedSymbols(array);
    } else if (!selectedSymbols.includes(symbol) && selectedSymbols.length < 3) {
      let array = Object.assign([], selectedSymbols); 
      array.push(symbol)
      setSelectedSymbols(array)
    }

  }


  useEffect(() => {
    
    let filteredData = symbols.filter(function(e) { 
      return e.symbol.toLowerCase().includes(textSearch.toLowerCase()) ||
      e.description.toLowerCase().includes(textSearch.toLowerCase()) ||
      e.type.toLowerCase().includes(textSearch.toLowerCase())
    })
    setFilteredSymbols(filteredData);
    setPageCount(Math.ceil(filteredData.length / itemsPerPage));
    setItemOffset(0);
    setEndOffset(itemsPerPage);
    setCurrentItems(filteredData.slice(0, itemsPerPage))


  }, [textSearch]);


  useEffect(() => {
    setEndOffset(itemOffset + itemsPerPage)
  }, [itemOffset]);


  useEffect(() => {
    setCurrentItems(filteredSymbols.slice(itemOffset, endOffset))
  }, [itemOffset, endOffset]);


  useEffect(() => {
    const controller = new AbortController();
		const signal = controller.signal;
    getSymbols(signal).then(res => {
      if (res && res.length > 0) {
        setSymbols(res);
        setFilteredSymbols(res);
        setPageCount(Math.ceil(res.length / itemsPerPage))
        setCurrentItems(res.slice(itemOffset, endOffset))
      }
    })
    return () => {
      controller.abort();
    };
  }, []);


    
  return (
    <Card className='px-3 py-2 m-5 card-background'>
      <Card.Body>
        <Form.Control 
          type="text" 
          data-testid="filter-symbols"
          placeholder="Normal text" 
          className='input search mb-4'
          onChange={ e => { setTextSearch(e.target.value) }}
        />
        
        <div className='card-scrolleable'>
          {
            currentItems.length > 0 ?
            currentItems.map( (symbol, index) => {
              return(
                <Row key={index} data-testid="symbols" className='pb-1 mb-3 border-bottom border-dark'>
                  
                  <Col xs={10}>
                    <small className='text-white'>
                      <strong>{symbol.symbol}</strong> {symbol.description}
                    </small>
                    <br></br>
                    <small className='text-white'>
                      {symbol.type}
                    </small>
                  </Col>
                  <Col xs={2}>
                    <Form.Check 
                      type='checkbox'
                      id={symbol.symbol}
                      onChange={toggleCheckbox}
                      checked={selectedSymbols.includes(symbol.symbol)}
                      disabled={!selectedSymbols.includes(symbol.symbol) && selectedSymbols.length == 3}
                      className='accent-green text-center'
                    />
                  </Col>
                </Row>
              )
            }) : <p>Loading</p>
          }
          <ReactPaginate
            breakLabel="..."
            nextLabel=" >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={1}
            pageCount={pageCount}
            previousLabel="< "
            renderOnZeroPageCount={null}
          />
        </div>

      </Card.Body>
    </Card>
  )
}