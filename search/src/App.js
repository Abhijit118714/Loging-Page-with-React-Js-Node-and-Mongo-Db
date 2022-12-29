import React from "react";
//import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './Register.js';
import Login from './Login.js'
import OTP from './OTP_SEND.js';

import Private from './block.js'
function App() {
  
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <Login/>
        }></Route>
        <Route path='/reg' element={<Register/>}></Route>
        <Route path='/otp' element={
          <Private>
            <OTP/>
          </Private>}>
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;

