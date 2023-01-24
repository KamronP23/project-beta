import React, { useState, useEffect } from 'react';

function ManufacturersList({ manufacturers, getManufacturers }){
  if (manufacturers === undefined) {
     return null
  }

  return (
    <>
      <table className="table table-striped align-middle mt-5">
        <thead>
          <tr>
            <th>Manufacturer</th>
          </tr>
        </thead>
        <tbody>
          {manufacturers.map((manufacturer) => {
            return (
              <tr key={manufacturer.id}>
                <td>{ manufacturer.name }</td>
              </tr>
            );
          })}
        </tbody>
      </table>      
    </>
    );
}

export default ManufacturersList;