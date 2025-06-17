import React, { useContext, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
import Axios from 'axios';

const Verify = () => {
    
    const [searchParams,setSearchParams] = useSearchParams()
    const success = searchParams.get("success")
    const orderId = searchParams.get("orderId")

    console.log(success,orderId);

    const {url} = useContext(StoreContext)
    const navigate = useNavigate()

    const verifyPayment = async()=>{
      const response = await Axios.post(`${url}/api/order/verify`,{success,orderId})
      if(response.data.success){
        navigate("/myorders")
      }else{
        navigate("/")
      }
    }

    useEffect(()=>{
      verifyPayment()
    },[])

  return (
    <div className='min-h-[60vh] grid'>
      <div className='h-[100px] w-[100px] place-self-center border-[5px] border-solid border-[#bdbdbd] border-t-red-500 rounded-full spinner'>
      
      </div>
    </div>
  )
}

export default Verify;
