import React, { useEffect, useState } from 'react';

function ServicesForm({getServices}) {

    const [technician_name, setTechnician_name] = useState('');

    const handleTechnician_nameChange = (event) => {
        const value = event.target.value;
        setTechnician_name(value);
      }

      const [customer_name, setCustomer_name] = useState('');

      const handleCustomer_nameChange = (event) => {
        const value = event.target.value;
        setCustomer_name(value);
      }

      const [date_time, setDate_time] = useState('');

      const handleDate_timeChange = (event) => {
        const value = event.target.value;
        setDate_time(value);
      }

      const [reason, setReason] = useState('');

      const handleReasonChange = (event) => {
        const value = event.target.value;
        setReason(value);
      }

      const [vip, setVip] = useState('');

      const handleVipChange = (event) => {
        const value = event.target.value;
        setReason(value);
      }

      const [completed, setCompleted] = useState(false);

      const handleSubmit = async (event) => {
        event.preventDefault();
      
        const data = {};
        data.technician = technician_name;
        data.customer_name = customer_name;
        data.date_time = date_time;
        data.reason = reason;
        data.completed = completed;
        data.vin = vin;
        data.vip = vip;
      
        const servicesUrl = 'http://localhost:8080/api/services/';
        const fetchConfig = {
          method: "post",
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        };
      
        const response = await fetch(servicesUrl, fetchConfig);
        if (response.ok) {
          const serviceAppt = await response.json();
          setTechnician_name('');
          setCustomer_name('');
          setDate_time('');
          setReason('');
          setCompleted(false);
          setVin('');
          setVip(false)
          getServices();        
        }
      }

    const [vin, setVin] = useState('');

    const handleVinChange = (event) => {
    const value = event.target.value;
    setVin(value);
    setVip(true);
    }
    
    const [vins, setVins] = useState([]);
    const fetchData = async () => {
        const url = 'http://localhost:8080/api/autosVOs/'

        const response = await fetch(url)

        if (response.ok) {
            const data = await response.json()
            setVins(data.autos)
            }
        }

    const [technicians, setTechnicians] = useState([]);
    const fetchTechs = async () => {
        const url = 'http://localhost:8080/api/technicians/'

        const response = await fetch(url)

        if (response.ok) {
            const data = await response.json()
            setTechnicians(data.technicians)
            }
        }

    useEffect(() => {
        fetchData();
        fetchTechs();
    }, [])
    return (
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Enter a service appointment</h1>
            <form onSubmit={handleSubmit} id="create-serviceappt-form">
              <div className="mb-3">
                <select onChange={handleTechnician_nameChange} placeholder="Technician" required type="text"  name="technician_name" id="technician_name" className="form-select" value={technician_name}>
                  <option>Technician</option>
                  {technicians.map(technician => {
                    return (
                        <option key={technician.employee_number} value={technician.technician_name}>
                            {technician.technician_name}
                        </option>
                    );
                  })}
                </select>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleCustomer_nameChange} placeholder="customer_name" required type="text" name="customer_name" id="customer_name" className="form-control" value={customer_name} />
                <label htmlFor="customer_name">Customer name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleDate_timeChange} placeholder="datetime" required type="datetime-local" name="date_time" id="date_time" className="form-control" value={date_time} />
                <label htmlFor="datetime-local">Date and Time</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleReasonChange} placeholder="Reason" required type="text" name="reason" id="reason" className="form-control" value={reason} />
                <label htmlFor="reason">Reason</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleVinChange} placeholder="Reason" required maxLength="17" type="text" name="vin" id="vin" className="form-control" value={vin} />
                <label htmlFor="vin">VIN</label>
              </div>
              <button className="btn btn-primary">Create appointment</button>
            </form>
          </div>
        </div>
      </div>
    )
}
export default ServicesForm;