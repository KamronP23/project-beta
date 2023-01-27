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
import ServicesForm from './ServicesForm'
import ServicesList from './ServicesList'
import ServiceHistoryList from './ServiceHistoryList'
import TechniciansForm from './TechnicianForm'


function App(props) {
  const [manufacturers, setManufacturers] = useState([])
  const [models, setModels] = useState([])
  const [automobiles, setAutomobiles] = useState([])
  const [services, setServices] = useState([])
  const [technicians, setTechnicians] =useState([])

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

  const getServices = async () => {
    const response = await fetch('http://localhost:8080/api/services/');
    if (response.ok) {
      const data = await response.json();
      const services = data.services
      setServices(services)
    }}

  const getTechnicians = async () => {
    const response = await fetch('http://localhost:8080/api/technicians/');
    if (response.ok) {
      const data = await response.json();
      const technicians = data.technicians
      setTechnicians(technicians)
    }}

useEffect (() => {
  getModels();
  getManufacturers();
  getAutomobiles();
  getServices();
  getTechnicians();
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
          <Route path="services/" element={<ServicesList services={services} getServices={getServices}/>} />
          <Route path="services/">
          <Route path="new" element={<ServicesForm getServices={getServices}/>} />
          <Route path="history" element={<ServiceHistoryList services={services} getServices={getServices}/>} />
          </Route>
          <Route path="technicians/">
          <Route path="new" element={<TechniciansForm technicians={technicians} getTechnicians={getTechnicians}/>} /> 
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
  }

export default App;
