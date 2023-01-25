import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

function Salesperson ({salesperson, getSalesperson}){
    const [salespersons, setSalespersons] = useState([]);
    const [sales, setSales] = useState([]);
    const [name, setName] = useState('');

    const fetchSalesData = async () => {
        const salesUrl = 'http://localhost:8090/api/sales';
        const response = await fetch(salesUrl);
        if (response.ok) {
            const data = await response.json();
            setSales(data.sales);
        }
    }

    const fetchSalespersonData = async () => {
        const salespersonUrl = 'http://localhost:8090/api/salespersons/';
        const response = await fetch(salespersonUrl);
        if (response.ok) {
            const data = await response.json();
            setSalespersons(data.salespersons);
        }
    }

    useEffect(() => {
        fetchSalesData();
        fetchSalespersonData();
    }, []);

    const handleSalespersonChange = async (event) => {
        const value = event.target.value;
        setName(value);
    }

    if (salespersons === undefined) {
        return null
    }

    return (

        <div>
            <div className="mb-3">
                <select className="form-select" onChange={handleSalespersonChange} value={name} name="name" required id="name">
                <option value="">Select salesperson</option>
                {salespersons.map(salesperson => {
                    return (
                        <option key={salesperson.id} value={salesperson.name}>
                            {salesperson.name}
                        </option>
                    );
                    })}
                </select>
            </div>
        <table className="table table-striped">
        <thead>
          <tr>
            <th>Salesperson</th>
            <th>Customer</th>
            <th>VIN</th>
            <th>Price</th>

          </tr>
        </thead>
        <tbody>
          {sales.map(sale => {
            return (
              <tr key={sale.id}>
                <td>{ sale.salesperson.name}</td>
                <td>{ sale.customer.name }</td>
                <td>{ sale.automobile.vin }</td>
                <td>{ sale.sale_price }</td>

              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
    );
}

export default Salesperson;