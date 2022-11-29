import  React, {useState, useEffect, useContext} from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from '@fortawesome/fontawesome-free-solid'
import { Context } from "../context/_context.js";
import { btcNumberFormat } from '../utils/helpers.js'
import { AddressSubscription } from '../utils/subsciption'
import { SAVE_ADDRESS_SUBSCRIPTION } from '../context/_types'

import { getExchangeRates } from '../apiCalls'

function Search({handleSearch, isLoadingData}) {
  const [input, setInput] = useState("");
  const[submitted, isSubmitted] =  useState(false)
  const [isValid, setIsValid] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [errors, setErrors] =  useState({})
  const [addressData, setAddressData] = useState({})
  const [loading, setLoading] =  useState(false)
  const [isTransactionHashValid,  setIsTransactionHashValid] = useState(false)

  const {data:{rates}, currency, save_addresses, dispatch} = useContext(Context)


  useEffect(() => {
    if(submitted){
      setLoading(true)
      async function getAddressData(){
        try{
          await axios.get(`https://blockchain.info/rawaddr/${input}`)
          .then(res => res.data)
          .then(res => {
            setLoading(false)
            setAddressData(res)
            handleSearch(res)
          })
       }catch(error){
            setLoading(false)
            setIsSubscribed(false)
            setIsValid(false)
            console.log({error})
           alert('Something went wrong')
       }
      }
      
      async function getTransactionData(){
        try{
          await axios.get(`https://blockchain.info/rawtx/${input}`)
          .then(res => res.data)
          .then(res => {
            setLoading(false)
            handleSearch(res, isTransactionHashValid)
          })
       }catch(error){
            setLoading(false)
            console.log({error})
            alert('Something went wrong')
           setIsSubscribed(false)
           setIsValid(false)
       }
      }
    
      //checking if input is a tranasction or addresses depending on the input length
      if(isTransactionHashValid) getTransactionData()
      else getAddressData()  
    }

    return () => {
      isSubmitted(false)
    
    }
  }, [currency, handleSearch, input, isSubmitted, isTransactionHashValid, submitted])

    function searchInput(){
      
      //emppty the data on submit click
      isLoadingData(true)
      setAddressData({})
      setIsValid(false)  
      setIsTransactionHashValid(false)

      
      //checking if input length is 64 so transaction
      //if 34 it means input is address
      if(input.length === 64) {
           setIsTransactionHashValid(true)
           setIsValid(false)
      }
     else if (input && input.length !== 34) {
         alert('Invalid Bitcoin Address')
        return;
      }  
       setIsSubscribed(false)
       setIsValid(true)   //This is used to check if there was no errors in the form 
      isSubmitted(true)
    }

    function onChangeCurrency(currency){
      getExchangeRates(currency, dispatch)
    }

    function subscribeToAddress(event){
     if (event.target.checked && input) {
         if(!save_addresses.includes(input)){
             save_addresses.push(input)
             //using localStorage to push the subscribe addresses 
             localStorage.setItem('address-subscriptions', JSON.stringify(save_addresses))

             //using dispatch from the useContext to update the state
            dispatch({type: SAVE_ADDRESS_SUBSCRIPTION, payload: save_addresses})
            alert('Subscribe Successfully!')
            setIsSubscribed(current => !current);
         }else{
              alert('Already included in the Subscription list!')
              setIsSubscribed(true)
         }
     
        }
    }

  return (
    <React.Fragment>
      <div id="seachForm">
        <div className="container-fluid">
  
            <form>
                 <div className="row mb-2">
                   <div className="col-12 col-md-4">
                   <label  style={{color:'#fff'}}>Select Currency</label>
                   <select defaultValue='btc' className="form-control mt-1" onChange={e => onChangeCurrency(e.target.value) }> 
                       <option value="btc" selected>BTC</option>
                       <option value="usd">USD</option>
                       <option value="eur">EUR</option>
                    </select>
                   </div>
                 </div>
                <div className="row">
                  <div className="col-12">
                  
                    <div className="input-group">
                      <input
                        className="form-control py-2 rounded-pill mr-1 pr-5"
                        type="text"
                        onChange={e => setInput(e.target.value)}
                        placeholder="Bitcoin Addresses / Transaction ID"
                      />
                      <span className="input-group-append search-icon">
                        <button onClick={searchInput}
                          className="btn rounded-pill border-0 ml-n5"
                          type="button"
                        >
                        <FontAwesomeIcon icon="fas fa-search" />
                        </button>
                      </span>
                    </div>
                    { (input !== '' && isValid && !isSubscribed && !isTransactionHashValid) &&  (<div className="form-check mt-1 mx-2">
                      <input className="form-check-input" type="checkbox"  value={isSubscribed}  id="flexCheckDefault" onChange={subscribeToAddress} />
                      <label className="form-check-label" for="flexCheckDefault">
                        Subscribe to this address
                      </label>
                    </div>)}
                  </div>
                </div>
              </form>  
        </div>
      </div>
      
      <div className="details mt-5">

      {!loading ? (
         addressData?.address && (
          <div className="addres-info mt-4">
             <div className="row">
             <ul className="list-group list-group-flush">
                <li className="list-group-item">Number of Confirm Transactions : {addressData?.n_tx }</li>
                <li className="list-group-item text-primary">Total BTC received :{ btcNumberFormat(rates, currency, addressData?.total_received) } {currency}</li>
                <li className="list-group-item text-danger">Total BTC Spent: {btcNumberFormat(rates, currency, addressData?.total_sent)} {currency}</li>
                <li className="list-group-item">Total BTC Unspent: { btcNumberFormat(rates, currency, addressData?.total_received - addressData?.total_sent)  }  {currency}</li>
                <li className="list-group-item text-success">Current Address Balance:{btcNumberFormat(rates, currency, addressData?.final_balance)} {currency}</li>
            </ul>
             </div>
          </div>
         )
         ) : (
            <div className="row">
              <div className="col-12">
               <p className="text-center">Loading...</p>
               </div>  
            </div>
         
         )}
      </div>   
    </React.Fragment>
  );
}

export default Search;
