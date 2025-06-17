import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../context/StoreContext'
import Axios  from 'axios'
import { assets } from '../../assets/frontend_assets/assets'

const MyOrders = () => {
    const {url,token} = useContext(StoreContext)
    const [data,setData] = useState([])

    const fetchOrders = async()=>{

        const response = await Axios.post(`${url}/api/order/userorders`,{},{headers:{token}})
        console.log("my orders are",response);
        setData(response.data.data)
    }

    useEffect(()=>{
        if(token){
            fetchOrders()
            
        }
    },[token])
    
  return (
    <div className='mt-[50px] mr-[50px] ml-[0px] mb-[0px]'>
      <h2>My Orders</h2>
      <div className='flex flex-col gap-5 mt-[30px]'>
        {data.map((order,index)=>(
           <div key={index} className='grid grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr] items-center gap-[30px] text-sm pt-2.5 pr-2.5 pl-5 pb-5 text-[#454545] border-[1px] border-solid border-red-500'>
            <img className='w-[50px]' src={assets.parcel_icon} alt="" /> 
            <p>{order.items.map((item,index)=>{
                if(index === order.items.length-1){
                    return item.name+" x "+item.quantity
                }else{
                  return item.name+" x "+item.quantity+", "

                }
            })}</p>
            <p>${order.amount}.00</p>
            <p>Items:{order.items.length}</p>
            <p><span className='text-red-500'>&#x25cf;</span><b className='font-medium text-[#454545]'>{order.status}</b></p>
            <button className='border-none p-3 rounded bg-[#ffe1e1] cursor-pointer text-[#454545]' onClick={fetchOrders}>Track Order</button>
            </div>
        ))}
      </div>
    </div>
  )
}

export default MyOrders
