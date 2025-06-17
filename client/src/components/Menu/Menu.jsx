import React from 'react'
import { menu_list } from '../../assets/frontend_assets/assets'

const Menu = ({category,setCategory}) => {
  return (
    <div className='flex flex-col gap-5 mt-10'>
        <h1 className='font-medium max-xs:text-start text-2xl'>Explore our menu</h1>
        <p className='text-base max-xs:text-wrap'>Choose from a diverse menu featuring a delectable array of dishes from all over the world just for you.our mission is to satisfy your cravings and elevate your dining experience.</p>
        <div className="flex justify-between items-center text-center gap-8 mt-5 mr-5 mb-0 ml-0 categories">
            {menu_list.map((item,index)=>(
                <div onClick={()=>setCategory(prev=>prev===item.menu_name ? "All":item.menu_name)} key={index} className='rounded-md'>
                    <img className='my-2 w-[8vw] min-w-20 cursor-pointer rounded-3xl' src={item.menu_image} alt="image" />
                    <p className='mt-3 text-[#424141]'>{item.menu_name}</p>
                </div>
            ))}
        </div>
        <hr className='mr-2.5 mb-2.5 ml-0 bg-[#e2e2e2]'/>
    </div>
  )
}

export default Menu;
