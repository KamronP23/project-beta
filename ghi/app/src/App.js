import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ManufacturersList from './ManufacturersList';
import ManufacturersForm from './ManufacturersForm';
import AutomobilesList from '.AutomobilesList'
import React from 'react';
import { useState, useEffect } from "react";

function App(props) {
  const [manufacturers, setManufacturers] = useState([])
 
  const getManufacturers = async () => {
    const url = 'http://localhost:8100/api/manufacturers/'
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      const manufacturers = data.manufacturers
      setManufacturers(manufacturers)
    }
  }
  useEffect(() => {
    getManufacturers();
}, [])

  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="manufacturers/" element={<ManufacturersList manufacturers={manufacturers} getManufacturers={getManufacturers} />} />
          <Route path="manufacturers/new" element={<ManufacturersForm getManufacturers={getManufacturers}/>} />
          <Route path="automobiles/" element={<AutomobilesList automobiles={automobiles} getModels={getModels} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
