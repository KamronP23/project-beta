import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

function SalesList ({sales, getSales}){
    if (sales === undefined) {
        return null
    }

    return (
        <table className="table table-striped">
        <thead>
          <tr>
            <th>Vin</th>
            <th>Salesperson</th>
            <th>Employee number</th>
            <th>Customer</th>
            <th>Price</th>

          </tr>
        </thead>
        <tbody>
          {sales.map(sale => {
            return (
              <tr key={sale.id}>
                <td>{ sale.automobile.vin }</td>
                <td>{ sale.salesperson.name }</td>
                <td>{ sale.salesperson.employee_number }</td>
                <td>{ sale.customer.name }</td>
                <td>${ sale.sale_price.toLocaleString() }</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
}

export default SalesList;