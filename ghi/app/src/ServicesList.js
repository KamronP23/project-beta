import React, { useState, useEffect } from 'react';

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

  const completedService = async (id) => {
    const response = await fetch(`http://localhost:8080/api/services/${id}/`, {      
      method: "put",
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
            <th>VIP</th>
            <th>Cancel</th>
            <th>Complete</th>
          </tr>
        </thead>
        <tbody>
          {services.filter(service => service.completed === false).map((service) => {
            return (
              <tr key={service.id}>
                <td>{ service.vin }</td>
                <td>{ service.customer_name }</td>
                <td>{ service.date_time }</td>
                <td>{ service.technician.technician_name }</td>
                <td>{ service.reason }</td>
                <td>{ String(service.vip) }</td>
                <td>
                  <button type="button" className="btn btn-danger" value={service.id} onClick={() => deleteService(service.id)}>Cancel</button> 
                </td>
                <td>
                  <button type="button" className="btn btn-success" value={service.id} onClick={() => completedService(service.id)}>Complete</button> 
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