import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Book from './pages/Book';
import UploadFile from './pages/UploadFile';
import { useState } from 'react';

function App(){
  
  const [isMenuActive, activeMenu] = useState(false);
  /*function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
    event.preventDefault()
    if(file !== undefined) {
      const url = 'localhost:3000';
      const formData = new FormData();
      
      formData.append('file', file);
      formData.append('fileName', file.name);
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      };
      axios.post(url, formData, config).then((response) => {
        console.log(response.data);
      });
    } else {
      return;
    }
  }
  <button type="submit">Upload</button>
  */
  

  return (
    <div className="App">
        <form>
          <h1 className="header">BOOKI</h1>
          <div className="row">
            <div className="column left">
              <button className="button hidden" onClick={()=> {(activeMenu(!isMenuActive));}}>Menu</button>
            </div>
            
            <div className="column center">
              <BrowserRouter>
                <Routes>
                    <Route path="/book" element={<Book/>} />
                    <Route path="*" element={<UploadFile />} />
                </Routes>
              </BrowserRouter>
            </div>
            
            <div className="column right">

            </div>
          </div>
        </form>
    </div>
  );
}

export default App;