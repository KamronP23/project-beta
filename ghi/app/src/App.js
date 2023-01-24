import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ManufacturersList from './ManufacturersList';
import ManufacturersForm from './ManufacturersForm';
import AutomobilesList from './AutomobilesList'
import React from 'react';
import ModelList from './ModelList';
import { useState, useEffect } from "react";
import CreateModelForm from './CreateModelForm'
import AutomobileForm from './AutomobileForm'
// import ServiceApptForm from './ServiceApptForm'
// import ServiceApptList from './ServiceApptList'
// import ServiceHistory from './ServiceHistory'


function App(props) {
  const [manufacturers, setManufacturers] = useState([])
  const [models, setModels] = useState([])
  const [automobiles, setAutomobiles] = useState([])

  const getAutomobiles = async () => {
    const url = 'http://localhost:8100/api/automobiles/'
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      const automobiles = data.autos;
      setAutomobiles(automobiles)
    }
  }

  const getManufacturers = async () => {
    const url = 'http://localhost:8100/api/manufacturers/'
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      const manufacturers = data.manufacturers
      setManufacturers(manufacturers)
    }
  }

  const getModels = async () => {
    const response = await fetch('http://localhost:8100/api/models/');
    if (response.ok) {
      const data = await response.json();
      const models = data.models
      setModels(models)
    }}

useEffect (() => {
  getModels();
  getManufacturers();
  getAutomobiles();
}, [])
  

  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="manufacturers/" element={<ManufacturersList manufacturers={manufacturers} getManufacturers={getManufacturers} />} />
          <Route path="manufacturers/new" element={<ManufacturersForm getManufacturers={getManufacturers}/>} />
          <Route path="automobiles/" element={<AutomobilesList automobiles={automobiles} getAutomobiles={getAutomobiles} />} />
          <Route path="automobiles/">
          <Route path="new" element={<AutomobileForm getAutomobiles={getAutomobiles}/>} />
          </Route>
          <Route path="models/" element={<ModelList models={models} getModels={getModels}/>} />
          <Route path="models/">
          <Route path="new" element={<CreateModelForm getModels={getModels}/>} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
  }

export default App;
