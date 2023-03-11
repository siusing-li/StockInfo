import { useState } from "react";

function App() {

  const [stockSymbol, setStockSymbol] = useState('');
  const [stockData, setStockData] = useState(null);
  const [stockDOM, setStockDOM] = useState(null);

  const handleInputChange = (event) => {
    setStockSymbol(event.target.value);
  }

  async function getAPIData() {
    const apiKey = 'ca8e9402bemshdf94ae190decc23p18a8d3jsn613a74a8f00d';
    // let url = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=${stockSymbol}&apikey=${apiKey}&outputsize=full`;
    let url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${apiKey}`;
    
    console.log(url);
    let stockData = {};
    try {
      await fetch(url)
        .then(res => res.json())
        .then(data => {
          stockData = data;
          console.log("fetched: ", stockData);
        })
    }
    catch (error) {
      console.error('error:' + error);
    }
    if (JSON.stringify(stockData) !== '{}' && JSON.stringify(stockData["Global Quote"]) !== '{}') {
      setStockData(stockData);
      setStockDOM(
        <div className="stockData">
          <h2 className="stockSymbol">{stockData["Global Quote"]["01. symbol"]}</h2>
          <p className="stockOpen"> Open: {stockData["Global Quote"]["02. open"]} </p>
          <p className="stockHigh"> High: {stockData["Global Quote"]["03. high"]} </p>
          <p className="stockLow"> Low: {stockData["Global Quote"]["04. low"]} </p>
          <p className="stockPrice"> Price: {stockData["Global Quote"]["05. price"]} </p>
          <p className="stockVolume"> Volume: {stockData["Global Quote"]["06. volume"]} </p>
        </div>
      )
      console.log("fetched, updating: ", stockDOM);
    }
    else {
      setStockDOM(
        <div className="stockData"></div>
      )
      alert("Error with your symbol");
    }
  }

  return (
    <div className="App">
      <div className='navBar'>
        <h1> What is your favorite stock? </h1>
      </div>
      <input type="text" className="stockTextInput" onChange={handleInputChange}></input>
      <button className='stockSubmitButton' onClick={getAPIData}>Submit</button>
      <div className="stockData">{stockDOM}</div>
    </div>

  )
}

export default App;
