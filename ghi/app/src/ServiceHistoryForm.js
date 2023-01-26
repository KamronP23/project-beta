import React, { useEffect, useState } from 'react';

function ServiceHistoryForm({getServices}) {

    const [VinFilt, setVinFilt] = useState('');


    const handleVinFiltChange = (event) => {
        const value = event.target.value;
        setVinFilt(value);
      }

    const handleSubmit = async (event) => {
    event.preventDefault();
    
    const data = {};
    data.VinFilt = VinFilt; 
    
    const techniciansUrl = 'http://localhost:8080/api/technicians/';
    const fetchConfig = {
        method: "post",
        body: JSON.stringify(data),
        headers: {
        'Content-Type': 'application/json',
        },
    };
    
    const response = await fetch(techniciansUrl, fetchConfig);
    if (response.ok) {
        const newTechnician = await response.json();
        setVinFilt('');
        getServices();        
    }
    }

    return (
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Enter a VIN to search</h1>
            <form onSubmit={handleSubmit} id="create-manufacturer-form">
              <div className="form-floating mb-3">
                <input onChange={handleVinFiltChange} placeholder="VinFilt" required type="text" name="VinFilt" id="VinFilt" className="form-control" value={VinFilt} />
                <label htmlFor="VinFilt">VIN</label>
              </div>
              <button className="btn btn-primary">Search for service records</button>
            </form>
          </div>
        </div>
      </div>
    )
}
export default ServiceHistoryForm;