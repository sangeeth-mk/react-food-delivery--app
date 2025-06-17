import React, { useContext, useState } from "react";
import { assets } from "../../assets/frontend_assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { toast } from 'react-toastify';

const Navbar = ({ setShowLogin }) => {
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const navigate = useNavigate()

  const logOut=()=>{
    localStorage.removeItem("token")
    setToken("")
    toast.success("logged out")
    navigate("/")
  }


  return (
    <>
      <div className="flex items-center justify-between pt-4 pr-4 pb-8% pl-8%">
        <Link to="/">
          <img src={assets.logo} className="w-36" alt="" />
        </Link>
        <ul className="capitalize text-lg rounded-full py-1 px-2 shadow-[0_0_30px_0_rgba(0,0,0,0.1)] max-xs:hidden max-mob:hidden">
          <li className="cursor-pointer inline-block px-3 py-2 text-[#000]">
            home
          </li>
          <li className="cursor-pointer inline-block px-3 py-2 text-[#000]">
            about
          </li>
          <li className="cursor-pointer inline-block px-3 py-2 text-[#000]">
            mobile-app
          </li>
          <li className="cursor-pointer inline-block px-3 py-2 text-[#000]">
            contact us
          </li>
        </ul>
        
        <div className="flex items-center gap-6">
          <img className="max-xs:hidden" src={assets.search_icon} alt="" />
          <div className="">
            <Link to="/cart">
              <img className={`${!token ? 'max-xs:w-10 max-xs:ml-2 max-xs:mr-2 max-mob:ml-1 max-mob:mr-4' : ""}`} src={assets.basket_icon} alt="" />
            </Link>
            <div
              className={getTotalCartAmount() === 0 ? "" : "absolute h-3 w-3 bg-red-500 rounded-full top-5 right-[211px] max-xs:top-3 max-xs:right-[92px]"}
            ></div>
          </div>
          {!token ? (
            <button className="py-2 px-5 text-base text-[#fff] text-center bg-red-500 border-none outline-none cursor-pointer transition hover:bg-[#efe2e0] max-xs:py-1 max-xs:px-3"
            onClick={() => setShowLogin(true)}
            >
            Login
            </button>
          ) : (
            <div className="relative" onMouseEnter={() => setDropdownVisible(true)} onMouseLeave={() => setDropdownVisible(false)}>
              <img src={assets.profile_icon} alt="Profile Icon" className="cursor-pointer"/>
              <ul className={`absolute right-0 z-10 mt-1 bg-[#ffff] w-28 border border-tomato-500 rounded-md outline-white p-3 list-none ${isDropdownVisible ? "flex flex-col gap-2" : "hidden"}`}>
               <li onClick={()=>navigate('/myorders')} className="flex items-center gap-2.5 cursor-pointer hover:text-red-500">
                  <img className="w-5" src={assets.bag_icon} alt="Orders Icon"/>
                  Orders
                </li>
                <hr className="border-gray-300 my-2" />

                <li onClick={logOut} className="flex items-center gap-2.5 cursor-pointer hover:text-red-500">
                  <img className="w-5" src={assets.logout_icon} alt="Logout Icon"/>
                  LogOut
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
