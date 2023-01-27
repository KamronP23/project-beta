import React, {useEffect, useState } from 'react';

function AutomobileForm({getAutomobiles}) {

    const [models, setModels] = useState([]);
    const [model, setModel] = useState('')
    const [color, setColor] = useState('')
    const [vin, setVin] = useState('')
    const [year, setYear] = useState('')


    const fetchData = async () => {
        const url = 'http://localhost:8100/api/models/';
        const response = await fetch(url);
        if (response.ok) {
        const data = await response.json();
        setModels(data.models);
        }
    }

    useEffect(() =>{
        fetchData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.color = color;
        data.year = year;
        data.model_id = model;
        data.vin = vin;

        const automobileUrl = 'http://localhost:8100/api/automobiles/'
        const fetchOptions = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
             'Content-Type': 'application/json',
           },
        };


        const autoResponse = await fetch(automobileUrl, fetchOptions);
          if (autoResponse.ok) {
            setModel('');
            setYear('');
            setColor('');
            setVin('');
            getAutomobiles('');
         }
      }

    const handleModelChange = (event) => {
        const value = event.target.value;
        setModel(value);
    }

    const handleColorChange = (event) => {
        const value = event.target.value;
        setColor(value);
    }

    const handleVinChange = (event) => {
        const value = event.target.value;
        setVin(value);
    }

    const handleYearChange = (event) => {
        const value = event.target.value;
        setYear(value);
    }



    return (
        <div className="my-5 container">
        <div className="row">
          <div className="col">
            <div className="card shadow">
              <div className="card-body">
                <form onSubmit={handleSubmit} id="create-model-form">
                  <h1 className="card-title">Create an Automobile</h1>
                  <p className="mb-3">
                    Choose a model
                  </p>
                    <div className="col">
                      <div className="form-floating mb-3">
                        <input onChange={handleColorChange} required placeholder="Color" type="text" id="color" name="color" className="form-control" value={color}/>
                        <label htmlFor="color">Color</label>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-floating mb-3">
                        <input onChange={handleYearChange} required placeholder="Year" type="text" id="year" name="year" className="form-control" value={year} />
                        <label htmlFor="year">Year</label>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-floating mb-3">
                        <input onChange={handleVinChange} required placeholder="VIN" type="text" id="vin" name="vin" className="form-control" value={vin} />
                        <label htmlFor="vin">VIN</label>
                      </div>
                    </div>
                    <div className="form-floating mb-3">
                    <select onChange={handleModelChange} name="model" id="model" className="form-select" required value={model}>
                      <option value="">Model</option>
                      {models.map(model => {
                        return (
                          <option key={model.id} value={model.id}>{model.name}</option>
                        )
                      })}
                    </select>
                  </div>
                  <button className="btn btn-lg btn-primary">Create</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default AutomobileForm;