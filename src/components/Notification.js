import  React, {useState, useContext} from "react";
import { Context } from "../context/_context.js";

function Notification(){
   const [notifications, setNotifications] =  useState([])  
  const {save_addresses} = useContext(Context)
    if(save_addresses !== undefined &&  save_addresses.length){
        var btcs = new WebSocket("wss://ws.block.io/");
        btcs.onopen = function() {
            btcs.send(JSON.stringify({
              "type": "ping"
            }))

            save_addresses.forEach(address => {
              btcs.send(JSON.stringify({
                "network": "BTC",
                "type": "address",
                "address":address
              }))
            });
        };

        btcs.onmessage = function (onmsg) {
          let response =  JSON.parse(onmsg.data)
          if(response.type === 'address'){
             setNotifications(notifications => [...notifications, response.data])
          }
        };
    }
    return (
      <div className="transactions-notifications">
        <h3>Transaction Notifications</h3>
        <p>Subscribe to the address to start receiving the notifications here</p>
        { notifications.length ? ( 
        <div className="list-group">
          {notifications.map(notification =>(
          <a href="#" className="list-group-item list-group-item-action">
            <span>Address: { notification.address}</span><span>Transaction Id: {notification.txid}</span><span>amount sent: {notification.amount_sent}</span><span>amount received:{notification.amount_received}</span><span>balance change:{notification.balance_change}</span>
          </a>))}
        </div>
        ) : (<div><p className="text-info">No Notifications yet!</p></div>)}
        
      </div>
    );
  }


export default Notification;
