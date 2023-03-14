import { useState } from 'react';
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './Pages/Home/HomePage';
import AddImage from './Pages/AddImage/AddImage';
import EditImage from './Pages/EditImage/EditImage';

function App() {

  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/add' element={<AddImage/>} />
    <Route path='/edit' element={<EditImage/>} />
   </Routes>
   </BrowserRouter>
  );
}

export default App;
