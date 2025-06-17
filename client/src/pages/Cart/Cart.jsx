import React, { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'

const Cart = () => {

  const { url,foodList,cartItems,removeFromcart,getTotalCartAmount } = useContext(StoreContext)

  const navigate = useNavigate()

  return (
    <div className='mt-14'>
      <div className=''>
          <div className='grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr] text-gray-500 items-center text-clamp([1vw,12px,12px]) max-xs:gap-1.5'>
            <p>Item</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>
          <br />
          <hr /> 
          {foodList.map((item,index)=>{
            if(cartItems[item._id]>0)
            {
              return (
              <>
                <div key={index} className='mt-[10px] mr-[10px] mb-0 ml-0 text-black grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr] items-center max-xs:gap-1.5'>
                <img src={url+"/uploads/"+item.image} alt="" className='w-12'/>
                <p>{item.name}</p>
                <p>{item.price}</p>
                <p>{cartItems[item._id]}</p>
                <p>${item.price*cartItems[item._id]}</p>
                <p className='cursor-pointer' onClick={()=>removeFromcart(item._id)}>X</p>
                </div>
                <hr className='h-[1px] bg-[#e2e2e2] border-none'/>
              </>
                
              )
            }
          })}   
      </div>

          <div className='mt-20 flex justify-between gap-vw-12 max-xs:flex-col-reverse '>
            <div className='flex-1 flex flex-col gap-5 mr-5 max-xs:mb-2 max-xs:mt-8'>
              <h2 className='font-medium'>Cart Totals</h2>
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
             <button className='bg-red-500 w-max-15vw-200px text-white border-none p-3 rounded-sm cursor-pointer' onClick={()=>navigate('/orders')}>Proceed to Checkout</button>
            </div>

            <div className='flex-1 max-xs:mb-4'>
              <div>
                <p className='text-[#555]'>If you have a promo code, Enter It here</p>
                <div className='mt-2.5 flex justify-between items-center bg-[#eaeaea] rounded-sm '>
                  <input className='border-none outline-none bg-transparent pl-2.5 max-mobile:pl-1' type="text" placeholder='promo code'/>
                  <button className='w-max-10vw-150px p-3 outline-none border-none bg-black text-[#ffff] max-mobile:p-3'>Submit</button>
                </div>
              </div>
            </div>
          </div>

    </div>
  )
}

export default Cart;
