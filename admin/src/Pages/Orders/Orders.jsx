import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import baseUrl from '../../constants'
import { toast } from 'react-toastify';
import {assets} from '../../assets/assets'

const Orders = () => {

  const [orders,setOrders] = useState([])

  const fetchUserOrders = async ()=>{

    const response = await Axios.get(`${baseUrl}/api/order/list`)
    
    if(response.data.success){
      setOrders(response.data.data)
    }else{
      toast.error(response.data.error || "error")
    }
  }

const statusHandler = async(event,orderId)=>{

  const response = await Axios.post(`${baseUrl}/api/order/status`,{orderId,status:event.target.value})
console.log(response);

if(response.data.success){
await fetchUserOrders()
}
}

  useEffect(()=>{
    fetchUserOrders()
  },[])

  return (
    <div className=''>
      <h3 className='ml-[30px] mt-4 text-lg font-medium'>Order Page</h3>
      <div className=''>
        {orders.map((order,index)=>(
          <div key={index} className='grid grid-cols-[0.5fr_2fr_1fr_1fr_1fr] items-start gap-[30px] border-solid border-[1px] border-red-500 p-5 m-[30px] text-sm text-[#505050]'>
            <img src={assets.parcel_icon} alt="" />
            <div className=''>
              <p className='font-semibold'>
                {order.items.map((item,index)=>{
                  if(index===order.items.length-1){
                    return item.name + " x " + item.quantity
                  }else{
                    return item.name + " x " + item.quantity + ", "
                  }
                })}
              </p>
              <p className='font-semibold mt-5 mb-2'>{order.address.firstName+" "+order.address.lastName}</p>
              <div className="mb-2.5">
                <p>{order.address.street+", "}</p>
                <p>{order.address.city+", "+order.address.state+", "+order.address.country+", "+order.address.zipcode}</p>
              </div>
              <p className="">{order.address.phone}</p>
            </div>
            <p>Items: {order.items.length}</p>
            <p>${order.amount}</p>
            <select className='bg-[#ffe8e4] p-2.5 outline-none border-solid border-[1px] border-red-500' name="" id="" onChange={(event)=>statusHandler(event,order._id)} value={order.status}>
              {/* <option className='border-solid border-[1px] text-black' disabled value="">choose</option> */}
              <option className="bg-[#ffe8e4]" value="Food Processing">Food Processing</option>
              <option className="bg-[#ffe8e4]" value="Out for delivery">Out for delivery</option>
              <option className="bg-[#ffe8e4]" value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders
