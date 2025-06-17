import React, { useState } from 'react'
import Menu from '../../components/Menu/Menu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import Footer from '../../components/Footer/Footer'
import Banner from '../../components/Banner/Banner'

const Home = () => {

  const[category,setCategory] = useState("All")

  return (
    <div>
      <Banner/>
        <Menu category={category} setCategory={setCategory}/>
        <FoodDisplay category={category}/>
        <Footer/>
    </div>
  )
}

export default Home
