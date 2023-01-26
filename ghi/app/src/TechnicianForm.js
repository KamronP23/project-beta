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

    // useEffect(() => {
    //     getManufacturers();
    // }, [])
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