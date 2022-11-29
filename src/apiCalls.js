import axios from 'axios'
import { SET_EXCHANGE_RATE } from "./context/_types"



export const getExchangeRates = async(currency, dispatch) => {
   try {
     await axios.get('https://blockchain.info/ticker')
     .then(res => res.data)
    .then(res =>  {
         let rates = {
            USD: res.USD,
            EUR: res.EUR
         }

         dispatch({type:SET_EXCHANGE_RATE, payload: {rates, currency}})
    })
   }
   catch(error){
    console.log({error})
   }
}
