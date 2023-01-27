import React, { useState } from 'react';

function ServiceHistoryList({ services, getServices }){

  const [VinFilt, setVinFilt] = useState('');

  const handleVinFiltChange = async (event) => {
    const value = event.target.value;
    setVinFilt(value);
    }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setVinFilt('');
    getServices();        
    
  }
  if (services === undefined) {
    return null
  }
  
    return (
      <>    
      <div><br></br></div>
      <form onSubmit={handleSubmit} id="create-serviceappt-form">
              <div className="mb-3">
                <div className="form-floating mb-3">
                  <input onChange={handleVinFiltChange} placeholder="VinFilt" required type="text" name="VinFilt" id="VinFilt" className="form-control" value={VinFilt} />
                  <label htmlFor="VinFilt">Please enter a VIN to see service records</label>
                </div>
                <button className="btn btn-primary">Reset VIN</button>
              </div>
      </form>            

      <table className="table table-striped align-middle mt-5">
        <thead>
          <tr>
            <th>VIN</th>
            <th>Customer name</th>
            <th>Date/Time</th> 
            <th>Technician</th>
            <th>Reason</th>
            <th>Complete</th>
          </tr>
        </thead>
        <tbody>
          {services.filter(service => service.vin === VinFilt).map((service) => {
            return (
              <tr key={service.id}>
                <td>{ service.vin }</td>
                <td>{ service.customer_name }</td>
                <td>{ service.date_time }</td>
                <td>{ service.technician.technician_name }</td>
                <td>{ service.reason }</td>
                <td>{ String(service.completed) }</td>
              </tr>
            );
          })}
        </tbody>
      </table>  
  
    </>
    );
}

export default ServiceHistoryList;