import { SET_EXCHANGE_RATE, SAVE_ADDRESS_SUBSCRIPTION, GET_ADDRESS_SUBSCRIPTIONS } from "./_types"

export const setExchangeRate = (data) => ({
    type:SET_EXCHANGE_RATE,
    payload:data
})

export const saveAddressSubscription = (address) => ({
    type:SAVE_ADDRESS_SUBSCRIPTION,
})

export const getAddressSubscriptions = (data) => ({
    type:GET_ADDRESS_SUBSCRIPTIONS,
    payload:data
})