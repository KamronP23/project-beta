import React, {useEffect, useState } from 'react';

function SalesForm({getSales}) {

    const [automobiles, setAutomobiles] = useState([]);
    const [salespersons, setSalespersons] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [automobile, setAutomobile] = useState('');
    const [customer, setCustomer] = useState('');
    const [salesperson, setSalesperson] = useState('');
    const [salePrice, setSalePrice] = useState('');


    const fetchAutomobileData = async () => {
        const url = 'http://localhost:8090/api/automobiles/';
        const response = await fetch(url);
        if (response.ok) {
        const data = await response.json();
        setAutomobiles(data.autos);
        }
    }

    const fetchCustomerData = async () => {
        const url = 'http://localhost:8090/api/customer/';
        const response = await fetch(url);
        if (response.ok) {
        const data = await response.json();
        setCustomers(data.customer);
        }
    }

    const fetchSalespersonData = async () => {
        const url = 'http://localhost:8090/api/salespersons/';
        const response = await fetch(url);
        if (response.ok) {
        const data = await response.json();
        setSalespersons(data.salespersons);
        }
    }

    useEffect(() =>{
        fetchAutomobileData();
        fetchCustomerData();
        fetchSalespersonData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.automobile = automobile;
        data.salesperson = salesperson;
        data.customer = customer;
        data.sale_price = salePrice;
        console.log(data)


        const salesUrl = 'http://localhost:8090/api/sales/'
        const fetchOptions = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
             'Content-Type': 'application/json',
           },
        };


        const salesResponse = await fetch(salesUrl, fetchOptions);
          if (salesResponse.ok) {
            setAutomobile('');
            setSalesperson('');
            setCustomer('');
            setSalePrice('');
            getSales('');
         }
      }

    const handleAutomobileChange = (event) => {
        const value = event.target.value;
        setAutomobile(value);
    }

    const handleSalespersonChange = (event) => {
        const value = event.target.value;
        setSalesperson(value);
    }

    const handleCustomerChange = (event) => {
        const value = event.target.value;
        setCustomer(value);
    }

    const handlePriceChange = (event) => {
        const value = event.target.value;
        setSalePrice(value);
    }



    return (
    <div className="my-5 container">
        <div className="row">
          <div className="col">
            <div className="card shadow">
              <div className="card-body">
                <form onSubmit={handleSubmit} id="create-model-form">
                  <h1 className="card-title">Create a Sale</h1>
                  <p className="mb-3">
                    Choose a model
                  </p>
                  <div className="form-floating mb-3">
                    <select onChange={handleAutomobileChange} name="automobile" id="automobile" className="form-select" required value={automobile}>
                      <option value="">Automobile</option>
                      {automobiles.map(auto => {
                        return (
                          <option key={auto.import_href} value={auto.import_href}>{auto.vin}</option>
                        )
                      })}
                    </select>
                    </div>
                    <div className="form-floating mb-3">
                    <select onChange={handleSalespersonChange} name="salesperson" id="salesperson" className="form-select" required value={salesperson}>
                      <option value="">Salesperson</option>
                      {salespersons.map(salesperson => {
                        return (
                          <option key={salesperson.id} value={salesperson.name}>{salesperson.name}</option>
                        )
                      })}
                    </select>
                    </div>
                    <div className="form-floating mb-3">
                    <select onChange={handleCustomerChange} name="customer" id="customer" className="form-select" required value={customer}>
                      <option value="">Customer</option>
                      {customers.map(customer => {
                        return (
                          <option key={customer.id} value={customer.name}>{customer.name}</option>
                        )
                      })}
                    </select>
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text">$</span>
                    <input onChange={handlePriceChange} type="text" className="form-control" required placeholder="0" id="sale_price" name="sale_price" value={salePrice} />
                    <span className="input-group-text">.00</span>
                </div>
                  <button className="btn btn-lg btn-primary">Create</button>
                </form>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
}

export default SalesForm;