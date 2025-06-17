import React, { useState } from 'react';
import { assets } from '../../assets/assets';
import Axios from 'axios';
import baseUrl from '../../constants/index'
import { toast } from 'react-toastify';

const Add = () => {

    const [image,setImage] = useState(false)

    const [data,setData] = useState({
        name:"",
        description:"",
        price:"",
        image:"",
        category:"Salad"
    })

    const onChangehandler = (e)=>{
        const name = e.target.name
        const value = e.target.value
        setData((data)=>({...data,[name]:value}))
    }

    const onSubmitHandler = async (e)=>{
        e.preventDefault();
        const formData = new FormData()
        formData.append("name",data.name)
        formData.append("price",Number(data.price))
        formData.append("description",data.description)
        formData.append("category",data.category)
        formData.append("image",image)

        const response = await Axios.post(`${baseUrl}/api/items/add`,formData)

        if(response.data.success){
            console.log("===data===",data);
            setData({
                name:"",
                description:"",
                price:"",
                category:"Salad"
            });
            setImage(false);
            toast.success(response.data.message);
        } else {
            toast.error(response.data.message || "error");
        }
        
    }



  return (
    <div className='w-[70%] ml-[max(5vw,25px)] mt-12 text-base text-[#6d6d6d]'>
      <form action="" className='flex flex-col gap-2.5'>
        <div className='flex flex-col gap-2.5 '>
            <p>Upload Image</p>
            <label htmlFor="image">
                <img className='w-[120px]' src={image?URL.createObjectURL(image) : assets.upload_area} alt="" />
            </label>
            <input type="file" name='image' onChange={(e)=>setImage(e.target.files[0])} id='image' hidden required />
        </div>

        <div className='flex flex-col gap-2.5 w-[max(40%,280px)]'>
            <p>Product Name</p>
            <input type="text" name='name' onChange={onChangehandler} value={data.name} placeholder='Type here' className='border-[1px] border-solid outline-none p-2.5'/>
        </div>

        <div className='flex flex-col gap-2.5 w-[max(40%,280px)]'>
            <p>Product description</p>
            <textarea name="description" onChange={onChangehandler} value={data.description} rows="6" placeholder='write content here' className='border-[1px] border-solid outline-none p-2.5'></textarea>
        </div>

        <div className='flex gap-[30px]'>
            <div className='flex flex-col gap-2.5'>
            <p>select category</p>
            <select name="category" onChange={onChangehandler} className='border-[1px] border-solid outline-none max-w-[120px] p-2.5'>
                <option value="Salad">Salad</option>
                <option value="Rolls">Rolls</option>
                <option value="Deserts">Deserts</option>
                <option value="Sandwich">Sandwich</option>
                <option value="Cake">Cake</option>
                <option value="Pure Veg">Pure Veg</option>
                <option value="Pasta">Pasta</option>
                <option value="Noodles">Noodles</option>
            </select>
            </div>

            <div className='flex flex-col gap-2.5'>
                <p>Price</p>
                <input type="number" name='price' onChange={onChangehandler} value={data.price} placeholder='$20' className='border-[1px] border-solid outline-none max-w-[120px] p-2.5'/>
            </div>
        </div>
        <button type='submit' className='bg-red-500 text-white cursor-pointer border-none p-2.5 max-w-[120px]' onClick={onSubmitHandler}>Add</button>
      </form>
    </div>
  )
}

export default Add
