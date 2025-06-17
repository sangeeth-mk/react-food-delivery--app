import React from "react";
import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-[18%] min-h-[100vh] border-[1px] border-solid border-[#a9a9a9] border-t-0 text-[max(1vw,10px)]">
      <div className="pt-[50px] pl-[20%] flex flex-col gap-5">
        
        <NavLink 
          to='/add' 
          style={({ isActive }) => ({
            backgroundColor: isActive ? '#f8d7da' : 'transparent', 
            borderColor: isActive ? '#ff4d4d' : '#a9a9a9', 
          })}
        >
          <div className="flex items-center gap-3 border-[1px] border-solid border-r-0 pt-2 pr-2 pb-2.5 pl-2.5 cursor-pointer rounded-tl-md rounded-bl-md">
            <img src={assets.add_icon} alt="" />
            <p>Add Items</p>
          </div>
        </NavLink>

        <NavLink 
          to='/list' 
          style={({ isActive }) => ({
            backgroundColor: isActive ? '#f8d7da' : 'transparent', 
            borderColor: isActive ? '#ff4d4d' : '#a9a9a9', 
          })}
        >
          <div className="flex items-center gap-3 border-[1px] border-solid border-r-0 pt-2 pr-2 pb-2.5 pl-2.5 cursor-pointer rounded-tl-md rounded-bl-md">
            <img src={assets.order_icon} alt="" />
            <p>List Items</p>
          </div>
        </NavLink>

        <NavLink 
          to='/orders' 
          style={({ isActive }) => ({
            backgroundColor: isActive ? '#f8d7da' : 'transparent', 
            borderColor: isActive ? '#ff4d4d' : '#a9a9a9', 
          })}
        >
          <div className="flex items-center gap-3 border-[1px] border-solid border-r-0 pt-2 pr-2 pb-2.5 pl-2.5 cursor-pointer rounded-tl-md rounded-bl-md">
            <img src={assets.order_icon} alt="" />
            <p>Orders</p>
          </div>
        </NavLink>

      </div>
    </div>
  );
};

export default Sidebar;
