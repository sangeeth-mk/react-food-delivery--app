import React, { useEffect, useState } from 'react'
import baseUrl from '../../constants/index'
import Axios from 'axios'
import { toast } from 'react-toastify';


const List = () => {

  const [list,setList] = useState([])

  const fetchItems = async()=> {

    const response = await Axios.get(`${baseUrl}/api/items`)
    console.log(response);
    if(response.data.success){
     setList(response.data.Items)
    }else{
     toast.error(response.data.error || "error")
    }

 }

  useEffect(()=>{

 fetchItems()
  },[])

const removeFood = async(foodId)=>{
  
const response = await Axios.delete(`${baseUrl}/api/items/${foodId}`)

if(response.data.success){
  toast.success(response.data.message)
  await fetchItems()
}else{
  toast.error(response.data.message || "error")
}
}


return (

  <div className="flex flex-col gap-2.5 w-full ">
    <p className='text-center mt-3 text-xl capitalize'>all foods</p>
    <div className="pl-3 pr-3 mt-5 overflow-y-scroll">
      <div className="bg-[#f9f9f9] flex justify-between items-center gap-2.5 p-3 border-solid border-[1px] border-[#cacaca] text-sm">
        <b>Image</b>
        <b>Name</b>
        <b>Price</b>
        <b>Category</b>
        <b>Action</b>
      </div>
      {list.map((item, index)=> (
        <div
          key={index}
          className="flex justify-between items-center gap-2.5 p-3 border-solid border-[1px] border-[#cacaca] text-sm"
        >
          <img className="w-12" src={`${baseUrl}/uploads/` + item.image} alt="" />
          <p>{item.name}</p>
          <p>{item.price}</p>
          <p>{item.category}</p>
          <p className="cursor-pointer" onClick={()=>removeFood(item._id)}>X</p>
        </div>
      ))}
    </div>
  </div>
);
}

export default List
