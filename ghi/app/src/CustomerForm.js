import React, { useEffect, useState } from 'react';

function CustomerForm({getSalesperson}) {
    const [name, setName] = useState('');
    const [street, setStreet] = useState('')
    const [city, setCity] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [state, setState] = useState('')
    const [phone, setPhone] = useState('')


    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.name = name;
        data.street = street;
        data.city = city;
        data.zip_code = zipCode;
        data.state = state;
        data.phone = phone;



        const hatUrl = 'http://localhost:8090/api/customer/';
        const fetchOptions = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
             'Content-Type': 'application/json',
           },
        };

         const hatResponse = await fetch(hatUrl, fetchOptions);
         if (hatResponse.ok) {
            console.log(hatResponse);
            setName('');
            setStreet('');
            setCity('');
            setZipCode('');
            setState('');
            setPhone('');

         }
      }
    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value);
    }

    const handleStreetChange = (event) => {
        const value = event.target.value;
        setStreet(value);
    }

    const handleCityChange = (event) => {
        const value = event.target.value;
        setCity(value);
    }
    const handleZipCodeChange = (event) => {
        const value = event.target.value;
        setZipCode(value);
    }
    const handleStateChange = (event) => {
        const value = event.target.value;
        setState(value);
    }
    const handlePhoneChange = (event) => {
        const value = event.target.value;
        setPhone(value);
    }



    return (
        <div className="my-5 container">
        <div className="row">
          <div className="col">
            <div className="card shadow">
              <div className="card-body">
                <form onSubmit={handleSubmit} id="create-hat-form">
                  <h1 className="card-title">Sign up</h1>
                    <div className="col">
                      <div className="form-floating mb-3">
                        <input onChange={handleNameChange} required placeholder="Name" type="text" id="name" name="name" className="form-control" value={name}/>
                        <label htmlFor="name">Name</label>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-floating mb-3">
                        <input onChange={handleStreetChange} required placeholder="Street" type="text" id="street" name="street" className="form-control" value={street} />
                        <label htmlFor="street">Street</label>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-floating mb-3">
                        <input onChange={handleCityChange} required placeholder="City" type="text" id="city" name="city" className="form-control" value={city} />
                        <label htmlFor="city">City</label>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-floating mb-3">
                        <input onChange={handleStateChange} required placeholder="State" type="text" id="state" name="state" className="form-control" value={state} />
                        <label htmlFor="state">State</label>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-floating mb-3">
                        <input onChange={handleZipCodeChange} required placeholder="Zip code" type="text" id="zip_code" name="zip_code" className="form-control" value={zipCode} />
                        <label htmlFor="zip_code">Zip Code</label>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-floating mb-3">
                        <input onChange={handlePhoneChange} required placeholder="Phone" type="text" id="phone" name="phone" className="form-control" value={phone} />
                        <label htmlFor="phone">Phone</label>
                      </div>
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

export default CustomerForm;