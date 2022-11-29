import { createContext, useReducer } from "react";
import Reducer  from "./_reducer";


const INIT_STATE = {
    data:{
         rate:{}
    },
    currency:"btc",
    save_addresses: JSON.parse(localStorage.getItem('address-subscriptions') || "[]")
}

export const Context = createContext(INIT_STATE)

export const ContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(Reducer, INIT_STATE)


    return (
        <Context.Provider value={{
            data:state.data,
            currency:state.currency,
            save_addresses: state.save_addresses,
           dispatch
        }}>
            {children}
        </Context.Provider>
    )
}
