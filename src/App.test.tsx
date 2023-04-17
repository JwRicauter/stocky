import { useState } from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import App from './App'
import * as api from './services/api'
import { Symbols } from './components/Symbols'
import { Charts } from './components/Charts'

jest.mock('use-resize-observer', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  })),
}))

describe('Symbols Component', () => {
  const { ResizeObserver } = window

  beforeEach(() => {
    //@ts-ignore
    delete window.ResizeObserver
    window.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }))
  })

  afterEach(() => {
    window.ResizeObserver = ResizeObserver
    jest.restoreAllMocks()
  })

  it('should render symbols when api respond', async () => {
    const onResponse = jest.fn()
    const onError = jest.fn()
    const controller = new AbortController()
    const signal = controller.signal

    return api
      .getSymbols(signal)
      .then(onResponse)
      .catch(onError)
      .finally(() => {
        expect(onResponse).toHaveBeenCalled()
        expect(onError).not.toHaveBeenCalled()
        expect(onResponse.mock.calls[0][0].length > 2000).toBeTruthy()
      })
  })

  it('should filter symbols by search text', async () => {
    const Wrapper = () => {
      const [selectedSymbols, setSelectedSymbols] = useState(['AAPL'])
      return (
        <Symbols
          selectedSymbols={selectedSymbols}
          setSelectedSymbols={setSelectedSymbols}
        />
      )
    }
    render(<Wrapper />)
    expect(screen.getByText('Loading')).toBeInTheDocument()
    //await waitFor(() => expect(screen.getByText('Loading')).not.toBeInTheDocument());
  })
})

describe('Testing stock candles api', () => {
  // After each test clear the mock
  beforeEach(() => jest.clearAllMocks())

  it('should render stock candels ok with no symbol', async () => {
    const onResponse = jest.fn()
    const onError = jest.fn()
    const controller = new AbortController()
    const signal = controller.signal

    return api
      .getCandles(signal, [], '1681164000', '1682460000')
      .then(onResponse)
      .catch(onError)
      .finally(() => {
        expect(onResponse).toHaveBeenCalled()
        expect(onError).not.toHaveBeenCalled()
        expect(onResponse.mock.calls[0][0].length == 0).toBeTruthy
      })
  })

  it('should render stock candels ok with one symbol', async () => {
    const onResponse = jest.fn()
    const onError = jest.fn()
    const controller = new AbortController()
    const signal = controller.signal

    return api
      .getCandles(signal, ['AAPL'], '1681164000', '1682460000')
      .then(onResponse)
      .catch(onError)
      .finally(() => {
        expect(onResponse).toHaveBeenCalled()
        expect(onError).not.toHaveBeenCalled()
        expect(onResponse.mock.calls[0][0][0].s == 'ok').toBeTruthy
      })
  })

  it('should show time chart', async () => {
    let today = new Date()
    let oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

    let chartComponent = render(
      <Charts
        dateRange={[oneWeekAgo, today]}
        priceType={'High Prices'}
        selectedSymbols={['AAPL']}
      />
    )

    await waitFor(() =>
      expect(chartComponent.getByTestId('chart')).toBeInTheDocument()
    )
  })
})
