import React from 'react'
import { BrowserRouter, Route, Routes, Link, useLocation } from 'react-router-dom'
import Home from './Home'
import Form from './Form'

function App() {
  return (
    <BrowserRouter>
      <div id="app">
        <nav>
          <Link to="/" >Home</Link>
          <Link to="order">Order</Link>

        </nav>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="order" element={<Form />} />
        </Routes>
      </div>
    </BrowserRouter>
    
  )
}

export default App
