import React, { useEffect, useState } from 'react';

function SalespersonForm({getSalesperson}) {
    const [name, setName] = useState('');
    const [employeeNumber, setEmployeeNumber] = useState('')


    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.name = name;
        data.employee_number = employeeNumber;


        const hatUrl = 'http://localhost:8090/api/salespersons/';
        const fetchOptions = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
             'Content-Type': 'application/json',
           },
        };

         const hatResponse = await fetch(hatUrl, fetchOptions);
         if (hatResponse.ok) {
            setName('');
            setEmployeeNumber('');
            getSalesperson('');
         }
      }
    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value);
    }

    const handleEmployeeNumberChange = (event) => {
        const value = event.target.value;
        setEmployeeNumber(value);
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
                        <input onChange={handleEmployeeNumberChange} required placeholder="Employee Number" type="text" id="employee_number" name="employee_number" className="form-control" value={employeeNumber} />
                        <label htmlFor="employee_number">Employee Number</label>
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

export default SalespersonForm;