import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

function ModelList ({models, getModels}){

    if (models === undefined) {
        return null
    }

    return (
        <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Manufacturer</th>
            <th>Picture</th>
          </tr>
        </thead>
        <tbody>
          {models.map(model => {
            return (
              <tr key={model.id}>
                <td>{ model.name }</td>
                <td>{ model.manufacturer.name }</td>
                <td><img src={model.picture_url} className="img-thumbnail" width="200" height="200"></img> </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
}

export default ModelList;