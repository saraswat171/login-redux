import React from 'react'
import { BrowserRouter as Router ,Route , Routes } from 'react-router-dom';

import Signup from '../Pages/signup';
import Login from '../Pages/login';
import Home from '../Pages/Home'

function Layout() {
  return (
   <Router>
    
    <Routes>
        <Route path='/Home' Component={Home} />
        <Route path='/Login' Component={Login} />
        <Route path='/' Component={Signup} />
    </Routes>
   </Router>
  )
}

export default Layout