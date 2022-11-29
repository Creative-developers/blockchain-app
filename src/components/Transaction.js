import React, {useContext} from "react";
import moment from 'moment'
import { Context } from "../context/_context.js";
import { btcNumberFormat } from '../utils/helpers.js'


function Transaction({transactions, address}) {

  const {data:{rates}, currency} = useContext(Context)

  return (
    <React.Fragment>
      <div id="transction-area" className="mt-4">
        <div className="container">
          <table className="table table-dark table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>Address</th>
                <th>Transaction hash</th>
                <th>Recieved Time</th>
                <th>Size in Bytes</th>
                <th>Total BTC Input</th>
                <th>Total BTC Output</th>
                <th>Total Fees</th>
              </tr>
            </thead>
            <tbody>
            {   transactions.map((transaction,i ) => {
                let total_input = 0, total_output =  0;
                 transaction?.inputs.map((input,i) => {
                       total_input+= input.prev_out.value
                })
              
                transaction?.out.map(output => {
                    total_output += output?.value
                })
                return (
              <tr>
                 <td>{i}</td>
                <td>{address}</td>
                <td>{transaction?.hash}</td>
                <td>{ moment.unix(transaction?.time).format('MMMM Do YYYY, h:mm:ss a') }</td>
                <td>{transaction?.size} Bytes</td>
                <td>{btcNumberFormat(rates, currency, total_input)} { currency }</td>
                <td>{btcNumberFormat(rates, currency, total_output)} { currency }</td>
                <td>{transaction?.fee}</td>
              </tr>
                )})}
            </tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Transaction;
