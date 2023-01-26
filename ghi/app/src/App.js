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
import SalespersonForm from './SalespersonForm';
import CustomerForm from './CustomerForm';
import SalesForm from './SalesForm';
import SalesList from './SalesList';
import Salesperson from './Salesperson';


function App(props) {
  const [manufacturers, setManufacturers] = useState([]);
  const [models, setModels] = useState([]);
  const [automobiles, setAutomobiles] = useState([]);
  const [salespersons, setSalespersons] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [sales, setSales] = useState([]);

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

  const getSalesperson = async () => {
    const response = await fetch ('http://localhost:8090/api/salespersons/');
    if (response.ok) {
      const data = await response.json();
      const salespersons = data.salespersons
      setSalespersons(salespersons)
    }
  }

  const getCustomer = async () => {
    const response = await fetch ('http://localhost:8090/api/customer/');
    if (response.ok) {
      const data = await response.json();
      const customer = data.customer
      setCustomer(customer)
    }
  }

  const getSales = async () => {
    const response = await fetch ('http://localhost:8090/api/sales/');
    if (response.ok) {
      const data = await response.json();
      const sales = data.sales
      setSales(sales)
    }
  }

useEffect (() => {
  getModels();
  getManufacturers();
  getAutomobiles();
  getSalesperson();
  getCustomer();
  getSales();
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
          <Route path="salespersons/" element={<SalespersonForm salespersons={salespersons} getSalesperson={getSalesperson} />} />
          <Route path="salespersons/">
          <Route path="record" element={<Salesperson getSalesperson={getSalesperson}/>} />
          </Route>
          <Route path="customer/" element={<CustomerForm customer={customer} getCustomer={getCustomer} />} />
          <Route path="sales/" element={<SalesList sales={sales} getSales={getSales} />} />
          <Route path="sales/">
          <Route path="new" element={<SalesForm getSales={getSales} getAutomobiles={getAutomobiles} getCustomer={getCustomer} getSalesperson={getSalesperson}/>} />
          </Route>

        </Routes>
      </div>
    </BrowserRouter>
  );
  }

export default App;
