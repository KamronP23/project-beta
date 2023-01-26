import React, { useEffect, useState } from 'react';

function TechnicianForm({getTechnicians}) {

    const [technician_name, setTechnician_name] = useState('');
    const [employee_number, setEmployee_number] = useState('');

    const handleTechnician_nameChange = (event) => {
        const value = event.target.value;
        setTechnician_name(value);
      }

    const handleEmployee_numberChange = (event) => {
        const value = event.target.value;
        setEmployee_number(value);
      }

    const handleSubmit = async (event) => {
    event.preventDefault();
    
    const data = {};
    data.technician_name = technician_name; 
    data.employee_number = employee_number;
    
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
        setTechnician_name('');
        setEmployee_number('');
        getTechnicians();        
    }
    }

    return (
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Enter a technician</h1>
            <form onSubmit={handleSubmit} id="create-manufacturer-form">
              <div className="form-floating mb-3">
                <input onChange={handleTechnician_nameChange} placeholder="Technician name" required type="text" name="technician_name" id="technician_name" className="form-control" value={technician_name} />
                <label htmlFor="technician">Technician name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleEmployee_numberChange} placeholder="Employee number" required type="number" name="employee_number" id="employee_number" className="form-control" value={employee_number} />
                <label htmlFor="technician">Employee number</label>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    )
}
export default TechnicianForm;

function ServicesList({ services, getServices }){
  const deleteService = async (id) => {
    const response = await fetch(`http://localhost:8080/api/services/${id}/`, {
      method: "delete",
    })
  if (response.ok) {
    return getServices()
  }
  }
  if (services === undefined) {
     return null
  }

  return (
    <>
      <table className="table table-striped align-middle mt-5">
        <thead>
          <tr>
            <th>VIN</th>
            <th>Customer name</th>
            <th>Date/Time</th> 
            <th>Technician</th>
            <th>Reason</th>
            <th>Cancel</th>
            <th>Complete</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => {
            return (
              <tr key={service.id}>
                <td>{ service.vin.vin }</td>
                <td>{ services.customer_name }</td>
                <td>{ service.date_time }</td>
                <td>{ service.technician.technician_name }</td>
                <td>{ service.reason }</td>
                <td>
                  <button type="button" className="btn btn-danger" value={service.id} onClick={() => deleteService(service.id)}>Cancel</button> 
                </td>
                <td>
                  <button type="button" className="btn btn-success" value={service.id} onClick={() => deleteService(service.id)}>Complete</button> 
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>      
    </>
    );
}

export default ServicesList;