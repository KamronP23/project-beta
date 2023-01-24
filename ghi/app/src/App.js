import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ModelList from './ModelList';
import { useState, useEffect } from "react";
import CreateModelForm from './CreateModelForm'


function App() {
const [models, setModels] = useState([])

  const getModels = async () => {
    const response = await fetch('http://localhost:8100/api/models/');
    if (response.ok) {
      const data = await response.json();
      const models = data.models
      setModels(models)
    }}

useEffect (() => {
  getModels();
}, [])

  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
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
