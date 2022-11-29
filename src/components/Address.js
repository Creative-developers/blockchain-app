
import React from 'react';
function Address({addresses}) {
   
  return (
    <React.Fragment>
      <div id="addaress-area" className="mt-4">
        <div className="container">
          <table className="table table-dark table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>Address</th>
                <th>Total balance</th>
              </tr>
            </thead>
            <tbody>
            {   addresses.map((address,i ) => {
                return (
              <tr>
                 <td>{i}</td>
                <td>{address?.address}</td>
                <td>{address?.balance}</td>
              </tr>
                )})}
            </tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Address;
