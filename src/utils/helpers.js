export const btcNumberFormat = (rates, currency, amount) => {  
    amount = amount / 100000000 //converting Satoshi  to BTC
   //  return amount
    switch(currency){
        case 'usd':
           amount =  amount * rates.USD['15m'];
           break;
        case 'eur':
        amount =  amount * rates.EUR['15m'];
        break; 
        default:
          break;
       }

       let convertedAmount, roundNumAmount

       if(Math.abs(amount) < 1e-1) {
         convertedAmount = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }else{
         roundNumAmount = (Math.round(amount * 100) / 100).toFixed(2);
           convertedAmount = roundNumAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
       return convertedAmount
}