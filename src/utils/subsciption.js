
import { useContext } from "react"
import { Context } from "../context/_context.js";
import { SAVE_ADDRESS_SUBSCRIPTION } from "../context/_types"


export const AddressSubscription = (address) => {
    const { save_addresses, dispatch} = useContext(Context)

    if (address) {

        if(save_addresses) {
           var updated_addresses_subscriptions =  {...address, save_addresses}
           localStorage.setItem('address-subscriptions', JSON.stringify(updated_addresses_subscriptions))
        }else{
           localStorage.setItem('address-subscriptions',  JSON.stringify({address}))
        }



        dispatch({type: SAVE_ADDRESS_SUBSCRIPTION, payload: JSON.stringify(localStorage.getItem('address-subscriptions')) })
    }
}