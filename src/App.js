import  React,{ useState} from "react";
import "./App.css";
import axios from "axios";
import Search from "./components/Search";
import Transaction from "./components/Transaction";
import Notification from "./components/Notification";
import Address from "./components/Address";

function App() {
  const [transactions, getTransactions] = useState([])
  const [transactionsStatus, setTransactionsStatus] = useState(false)
  const [address, setAddressNum] = useState('')
  const [isHomeTabActive, setIsHomeTabActive] = useState(true)
  const [fetchingAddresses, setFetchingAddresses] =  useState(false)
  const [TopAddresses, setTopAddresses] = useState([])

  function handleSearch(response, isTransactionHashValid=false){

    if(isTransactionHashValid){
      setTransactionsStatus(true)
      let transactions = []
      transactions.push(response)
      getTransactions(transactions)
    }

    if(response?.n_tx && response?.n_tx > 0 && !isTransactionHashValid){
       setTransactionsStatus(true)
       setAddressNum(response?.address)
       getTransactions(response?.txs)
      //  setCurrency(currency)
      //  setExchangeRate(exchangeRate)
    }
  }

  function isLoadingData(loading=false){
     if(loading)  setTransactionsStatus(false)
     
  }

  function onClickHomeTab(){
    // set transaction status to false so if the transactions was lodaed before it should not be shown
    setIsHomeTabActive(true)
    setTransactionsStatus(false)
  }

  async function getTopAddresses(){
    // set home tab tab to false and make the status for fetching Address to be true
    //This can all managed be the state managment using redux but since i was on the deadline so i use useState to create the states
    setIsHomeTabActive(false)
    setFetchingAddresses(true)
     

    //calling Api inn Node JS to get data from the scapping the website https://explorer.btc.com/stats/rich-list using puppeteer

       await axios.get('http://localhost:5000/api/getAdddresses')
       .then(res => res.data)
       .then(res => {
        setFetchingAddresses(false)
        setTopAddresses(res)
       })
     
  }


  return (
    <React.Fragment>
      <div id="main">
        <div className="container-fluid">
        <div className="my-4">
            <ul class="nav nav-tabs" role="tablist">
              <li class="nav-item">
                <a class="nav-link active" onClick={onClickHomeTab} data-bs-toggle="tab" href="#home">Search By Adddress/Transaction Id</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" onClick={getTopAddresses} data-bs-toggle="tab" href="#menu1">Top 5 Addresses</a>
              </li>
            </ul>
            <div class="tab-content">
              { isHomeTabActive ? (
                  <div id="home" class="container tab-pane active">
                      <section className="search-area">
                        <div className="form-area">
                        <h3 className="main-title">Search Bitcoin Address</h3>
                            <Search handleSearch={handleSearch} isLoadingData={isLoadingData}/>
                        </div>
                      </section>
                  </div>
              ): (
                  <div class="top-addresses container pt-5" style={{width:'900px'}}>
                      <h3>Top 5 Address</h3>
                      <p>Using <strong>Puppeteer</strong> In Node JS to Scrap the addresses from 3 part website</p>

                      { fetchingAddresses ? (<div className="text-info">Loading</div>): (
                         <Address addresses={TopAddresses}/>
                      )}
                  </div>
              )}
           </div>     
        </div>     
          <Notification/>
           {
            (transactions && transactionsStatus && isHomeTabActive) && (
              <Transaction transactions={transactions} address={address}/>
            )
           }
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
