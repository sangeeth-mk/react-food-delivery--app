import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import { Routes,Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart'
import Orders from './pages/Orders/Orders';
import Login from './components/Auth/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/verify/Verify';
import MyOrders from './pages/MyOrders/MyOrders';

function App() {

  const [showLogin,setShowLogin] = useState(false)

  return (
  <> 
  
   <ToastContainer position="top-right" 
    autoClose={2000} 
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    />

  {showLogin ? <Login  setShowLogin={setShowLogin}/> : <></>}   
  <div className='w-[80%] m-auto'>
    <Navbar setShowLogin={setShowLogin}/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/orders' element={<Orders/>}/>
      <Route path='/verify' element={<Verify/>}/>
      <Route path='/myorders' element={<MyOrders/>}/>
    </Routes>
    </div>
  </>
  )
}

export default App;
