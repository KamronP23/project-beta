import React, {useEffect, useState } from 'react';


function ModelForm({getModels}) {

    const [manufacturers, setmanufacturers] = useState([]);
    const [modelName, setModelName] = useState('')
    const [pictureUrl, setPictureUrl] = useState('')
    const [manufacturer, setManufacturer] = useState('')

    const fetchData = async () => {
        const url = 'http://localhost:8100/api/manufacturers/';
        const response = await fetch(url);
        if (response.ok) {
        const data = await response.json();
        setmanufacturers(data.manufacturers);
        }
    }

    useEffect(() =>{
        fetchData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.name = modelName;
        data.picture_url = pictureUrl;
        data.manufacturer_id = manufacturer;
        console.log(data)


        const modelUrl = '//localhost:8100/api/models/'
        const fetchOptions = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
             'Content-Type': 'application/json',
           },
        };


        const modelResponse = await fetch(modelUrl, fetchOptions);
          if (modelResponse.ok) {
            setManufacturer('');
            setModelName('');
            setPictureUrl('');
            getModels('');

         }
      }
    const handleNameChange = (event) => {
        const value = event.target.value;
        setModelName(value);
    }

    const handleManufacturerChange = (event) => {
        const value = event.target.value;
        setManufacturer(value);
    }

    const handlePictureUrlChange = (event) => {
        const value = event.target.value;
        setPictureUrl(value);
    }



    return (
        <div className="my-5 container">
        <div className="row">
          <div className="col">
            <div className="card shadow">
              <div className="card-body">
                <form onSubmit={handleSubmit} id="create-model-form">
                  <h1 className="card-title">Create a model</h1>
                  <p className="mb-3">
                    Choose a manufacturer
                  </p>
                    <div className="col">
                      <div className="form-floating mb-3">
                        <input onChange={handleNameChange} required placeholder="Name" type="text" id="name" name="name" className="form-control" value={modelName}/>
                        <label htmlFor="name">Name</label>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-floating mb-3">
                        <input onChange={handlePictureUrlChange} required placeholder="Picture URL" type="text" id="picture_url" name="picture_url" className="form-control" value={pictureUrl} />
                        <label htmlFor="picture_url">Picture URL</label>
                      </div>
                    </div>
                    <div className="form-floating mb-3">
                    <select onChange={handleManufacturerChange} name="manufacturer" id="manufacturer" className="form-select" required value={manufacturer}>
                      <option value="">Manufacturer</option>
                      {manufacturers.map(manufacturer => {
                        return (
                          <option key={manufacturer.id} value={manufacturer.id}>{manufacturer.name}</option>
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

export default ModelForm;