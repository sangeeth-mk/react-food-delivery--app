import React, { useContext } from 'react'
import { assets } from '../../assets/frontend_assets/assets'
import { StoreContext } from '../../context/StoreContext'

const FoodItem = ({id,name,price,description,image}) => {

  const {cartItems,addToCart,removeFromcart,url} = useContext(StoreContext);

  return (
    <div className='w-full m-auto rounded-md transition duration-300 animate-fade-in food_item'>
      <div className='relative'>
        <img className='rounded-t-xl' src={url+"/uploads/"+image} alt="" />
        {
          !cartItems[id] ? <img className='w-9 rounded-full absolute bottom-4 right-4 cursor-pointer'  src={assets.add_icon_white} onClick={()=>addToCart(id)} alt="" />
          : <div className='absolute bottom-4 right-4 cursor-pointer flex items-center gap-2.5 p-1.5 rounded-full bg-white'>
            <img className='w-7.5' src={assets.remove_icon_red} onClick={()=>removeFromcart(id)} alt="" />
            <p>{cartItems[id]}</p>
            <img className='w-7.5' src={assets.add_icon_green} onClick={()=>addToCart(id)} alt="" />
            </div>
        }
      </div>

      <div className='p-5'>
        <div className='flex justify-between items-center mb-2.5'>
        <p className='text-[20px] font-medium'>{name}</p>
        <img src={assets.rating_stars} alt="" className='w-[75px]' />
        </div>
        <p className='text-[#676767] text-[12px]'>{description}</p>
        <p className='text-[#f0301e] text-[22px] font-bold mt-2.5 mr-2.5 mb-0 ml-0'>${price}</p>
      </div>
    </div>
  )
}

export default FoodItem
