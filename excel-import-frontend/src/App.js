import React, { Fragment, useEffect, useState, useRef } from 'react';
import Axios from 'axios';
import './App.css';

function App() {

  const port = 'http://localhost:3001/importExcel';

  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);
  const [fileName, setFileName] = useState('');

  const myElement = useRef(null);

  useEffect(() => {
    fetchData();
  }, [])



  const fetchData = () => {
    Axios.get(port).then(response => {
      setData(response.data);
    }).catch(error => {
      console.error(error);
    })
  }

  const fileSelected = (event) => {
    if (event.target.files[0].name.split(".")[1] === "xlsx") {
      if (event.target.files.length > 0) {
        setFile(event.target.files[0]);
        setFileName(event.target.files[0].name);
      } else {
        alert('No file selected');
      }
    }
    else {
      alert("invalid file type!!");
    }
  }

  const handleSubmission = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      try {
        await Axios.post(port, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        fetchData();
      } catch (error) {
        console.log(error);
      }
    }
    else {
      alert("No file selected!!");
    }
  }

  //data Transformation
  const transformedData = data?.map((item) => ({
    _id: item._id,
    name: item.name,
    email: item.email,
    phone: item.phone,
  }))


  return (
    <Fragment>
      <div className='notice'>
        <p>Only one file accepted!!</p>
      </div>
      <form>
        <fieldset className='field'>
          <legend>Excel File</legend>
          <div className='fileInput'>
            <div className='label-Div'>
              <label htmlFor='fileInput' className='fileInput-Label'>Select a file</label>
            </div>
            <div className='name-div'>
              <span className='fileName'>{fileName === '' ? 'No files selected' : fileName}</span>
            </div>
            <input type='file' id='fileInput' name='fileInput' onChange={fileSelected} accept='.xlsx'></input>
          </div>
          <button type="button" onClick={handleSubmission} className='button'>Submit</button>
        </fieldset>
      </form>
      <div>
        {data.length > 0 ? (<table className='dataTable' aria-readonly="true">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody id='table' ref={myElement}>
            {transformedData.map((item, index) =>
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
              </tr>
            )}
          </tbody>
        </table>) : (<p className='paragraph'>No Data Found</p>)}
      </div>
      {/* <div className='container'>

        <div className='import-section'>
          <h2 className='import-heading'>Import Excel File</h2>
          <hr className='import-line' />
          <input type='file' id='fileInput' name='fileInput' onChange={fileSelected} accept='.xlsx'></input>
          <label htmlFor='fileInput' className='fileInput-Label'>
            <i className='fas fa-cloud-upload-alt'></i>
            <span>Select a file</span>
          </label>

          <span className='fileName'>{fileName == '' ? 'No files selected' : fileName}</span>
          <button type='button' onClick={handleSubmission} className='button'>Submit</button>
        </div>

        <div className='view-section'>
          <table className='dataTable' aria-readonly="true">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>
            {/* <tbody id='table' ref={myElement}>
              <tr>
                <td>1</td>
                <td>Rohan</td>
                <td>rohan@gmail.com</td>
                <td>98023</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Rohan</td>
                <td>rohan@gmail.com</td>
                <td>98023</td>
              </tr>
          </tbody>*/}
      {/* <tbody id='table' ref={myElement}>
        {transformedData.map((item, index) =>
          <tr key={index}>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.phone}</td>
          </tr>
        )}
      </tbody> 
    </table>
        </div >
    </div >*/}
    </Fragment >
  );
}

export default App;
