import React, { useState, useEffect } from 'react';

function AutomobilesList({ automobiles, getAutomobiles }){
  const deleteAutomobile = async (id) => {
    const response = await fetch(`http://localhost:8100/api/automobiles/${id}/`, {
      method: "delete",
    })
  if (response.ok) {
    return getAutomobiles()
  }
  }
  if (automobiles === undefined) {
     return null
  }

  return (
    <>
      <table className="table table-striped align-middle mt-5">
        <thead>
          <tr>
            <th>Model</th>
            <th>Manufacturer</th>
            <th>Color</th>
            <th>Year</th>
            <th>VIN</th>
            <th>Picture</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {automobiles.map(automobile => {
            return (
              <tr key={automobile.vin}>
                <td>{ automobile.model.name }</td>
                <td>{ automobile.model.manufacturer.name }</td>
                <td>{ automobile.color }</td>
                <td>{ automobile.year }</td>
                <td>{ automobile.vin }</td>
                <td><img src={automobile.model.picture_url} className="img-thumbnail" width="150" height="150"></img></td>
                <td>
                  <button type="button" value={automobile.vin} onClick={() => deleteAutomobile(automobile.vin)}>Delete</button> 
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>      
    </>
    );
}

export default AutomobilesList;