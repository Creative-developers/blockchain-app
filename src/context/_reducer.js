import { SET_EXCHANGE_RATE, SAVE_ADDRESS_SUBSCRIPTION, GET_ADDRESS_SUBSCRIPTIONS } from "./_types"

const Reducer = (state, action) => {
    console.log({payload:action})
    switch(action.type){
        case SET_EXCHANGE_RATE:
            return {
                ...state,
                data:action.payload,
                currency: action.payload.currency,
            }
        case GET_ADDRESS_SUBSCRIPTIONS:
           return {
            ...state,
            save_addresses: localStorage.getItem('address-subscriptions')
           }

        case SAVE_ADDRESS_SUBSCRIPTION:
            return {
                ...state,
                save_addresses: action.payload
            }   
                
        default:
            return{
               ...state
            }       
    }
}

export default Reducer