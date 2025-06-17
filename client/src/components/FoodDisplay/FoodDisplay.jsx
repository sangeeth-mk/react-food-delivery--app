import React, { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = ({category}) => {

const {foodList} = useContext(StoreContext)

  return (
    <div className='mt-7.5'>
      <h2 className='font-semibold text-2xl'>Top dishes near you</h2>
      <div className='grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] mt-8 gap-8'>
        {
            foodList.map((item,index)=>{

              if (category==="All" || category===item.category){
                return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image}/>
              }
            })
        }
      </div>
    </div>
  )
}

export default FoodDisplay;
