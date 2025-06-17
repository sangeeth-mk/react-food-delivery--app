import Navbar from "./Components/Navbar/Navbar"
import Sidebar from "./Components/Sidebar/Sidebar"
import {Routes,Route} from 'react-router-dom'
import Add from "./Pages/Add/Add"
import List from "./Pages/List/List"
import Orders from "./Pages/Orders/Orders"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
    <ToastContainer position="top-right" 
  autoClose={3000} 
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover/>
     <Navbar/>
     <hr  className="border-none h-[1px] bg-[#a9a9a9]"/>
     <div className="flex">
      <Sidebar/>
      <Routes>
        <Route path="/add" element={<Add/>}/>
        <Route path="/list" element={<List/>}/>
        <Route path="/orders" element={<Orders/>}/>
      </Routes>
     </div>
    </>
  )
}

export default App
