import React from 'react'
import {  Route, Routes, NavLink, useLocation } from 'react-router-dom'
import Home from './Home'
import Form from './Form'

function App() {
  return (
      <div id="app">
        <nav>
          <NavLink to="/" activeclassname="active">Home</NavLink>
          <NavLink to="order" activeclassname = "active">Order</NavLink>

        </nav>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="order" element={<Form />} />
        </Routes>
      </div>
    
  )
}

export default App
