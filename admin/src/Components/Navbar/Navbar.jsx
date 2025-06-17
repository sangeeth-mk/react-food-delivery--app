import React from 'react'
import {assets} from '../../assets/assets'
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='flex justify-between items-center pt-4 pb-4 pr-10 pl-10'>
      <Link to='/'><img src={assets.logo} alt="logo" className='w-[max(10%,120px)]' /></Link>
      <img src={assets.profile_image} alt="profile_image" className='w-12' />
    </div>
  )
}

export default Navbar;
