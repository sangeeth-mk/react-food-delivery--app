import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../context/StoreContext'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Orders = () => {

  const {getTotalCartAmount,token,foodList,url,cartItems} = useContext(StoreContext)

  const [data,setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  })

  const onchangehandler = (e)=>{
    const name = e.target.name
    const value = e.target.value
    setData(data=>({...data,[name]:value}))
  }

  const placeOrder = async(e)=>{
    e.preventDefault()
    let orderItems = []

    foodList.map((item)=>{
      if(cartItems[item._id]>0){
        let itemInfo = item
        itemInfo["quantity"] = cartItems[item._id]
        orderItems.push(itemInfo)
      }
    })

    let orderData = {
      address:data,
      items:orderItems,
      amount:getTotalCartAmount()+2,
    }

    let response = await Axios.post(`${url}/api/order/place`,orderData,{headers:{token}})
    console.log("orders are",response);
    if(response.data.success){
       const {session_url} = response.data
       window.location.replace(session_url)
    }else{
      console.log(response.data.error);
    }
  }

  const navigate = useNavigate()

  useEffect(()=>{
    if(!token){
      navigate('/cart')
    }else if(getTotalCartAmount()===0){
      navigate('/cart')
    }
  },[])

  return (
    <>
    <form onSubmit={placeOrder} action="" className='flex justify-between gap-[50px] mt-[100px] max-xs:flex-col'>
      <div className='max-xs:w-full'>
        <h2 className='font-semibold text-3xl mb-5'>Delivery Information</h2>
        <div className='flex gap-[10px]'>
          <input required type="text" name='firstName' onChange={onchangehandler} value={data.firstName} placeholder='First Name' className='border-2 border-solid border-[#c5c5c5] outline-red-500 mb-4 p-[10px] w-full rounded-md'/>
          <input required type="text" name='lastName' placeholder='Last Name' onChange={onchangehandler} value={data.lastName} className='border-2 border-solid border-[#c5c5c5] outline-red-500 mb-4 p-[10px] w-full rounded-md'/>
        </div> 
        <input required type="email" placeholder='Email' name='email' onChange={onchangehandler} value={data.email} className='border-2 border-solid border-[#c5c5c5] outline-red-500 mb-4 p-[10px] w-full rounded-md'/>
        <input required type="text" placeholder='Street' name='street' onChange={onchangehandler} value={data.street} className='border-2 border-solid border-[#c5c5c5] outline-red-500 mb-4 p-[10px] w-full rounded-md'/>
        <div className='flex gap-[10px]'>
          <input required type="text" placeholder='City' name='city' onChange={onchangehandler} value={data.city} className='border-2 border-solid border-[#c5c5c5] outline-red-500 mb-4 p-[10px] w-full rounded-md'/>
          <input required type="text" placeholder='State' name='state' onChange={onchangehandler} value={data.state} className='border-2 border-solid border-[#c5c5c5] outline-red-500 mb-4 p-[10px] w-full rounded-md'/>
        </div> 
        <div className='flex gap-[10px]'>
          <input required type="text" placeholder='Zip Code' name='zipcode' onChange={onchangehandler} value={data.zipcode} className='border-2 border-solid border-[#c5c5c5] outline-red-500 mb-4 p-[10px] w-full rounded-md'/>
          <input required type="text" placeholder='Country' name='country' onChange={onchangehandler} value={data.country} className='border-2 border-solid border-[#c5c5c5] outline-red-500 mb-4 p-[10px] w-full rounded-md'/>
        </div> 
        <input required type="text" name='phone' onChange={onchangehandler} value={data.phone} placeholder='Phone' className='border-2 border-solid border-[#c5c5c5] outline-red-500 mb-4 p-[10px] w-full rounded-md'/>
      </div>

      <div className='w-[50%] max-w-40%max-w-500px max-xs:w-full'>
      <div className='flex-1 flex flex-col gap-5 mr-5 max-mobile:mt-3'>
              <h2 className='font-semibold text-3xl mb-5'>Cart Totals</h2>
              <div> 
              <div className='flex justify-between text-[#555]'>
                  <p>Subtotal</p>
                  <p>${getTotalCartAmount()}</p>
                </div>
                <hr className='mt-2.5 mr-2.5 mb-0 ml-0'/>

                <div className='flex justify-between text-[#555]'>
                  <p>Delivery Fee</p>
                  <p>${getTotalCartAmount()===0?0:2}</p>
                </div>
                <hr className='mt-2.5 mr-2.5 mb-0 ml-0'/>


                <div className='flex justify-between text-[#555]'>
                <p>Total</p>
                <p>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</p>
                </div>
                
             </div>
             <button type='submit' onClick={placeOrder} className='bg-red-500 w-max text-white border-none p-3 mt-2.5 rounded-sm cursor-pointer'>Proceed to payment</button>
            </div>
      </div>
    </form>
    </>
  )
}

export default Orders
