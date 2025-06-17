import React, { useContext, useState } from 'react'
import { assets } from '../../assets/frontend_assets/assets'
import { StoreContext } from '../../context/StoreContext'
import Axios from 'axios'
import { toast } from 'react-toastify';


const Login = ({setShowLogin}) => {

const {url,setToken} = useContext(StoreContext)    

const [currState,setCurrState] = useState("Login")

const [data,setData]=useState({
    name:"",
    email:"",
    password:""
})


const onChangeHandler = (e)=>{

    const name = e.target.name;
    const value = e.target.value;
    setData(data=>({...data,[name]:value}))
}

const onLogin = async(e)=>{

    e.preventDefault()
    let newUrl = url;
    if(currState==="Login"){
        newUrl += '/api/user/login'
    }else{
        newUrl += '/api/user/register'
    }

    const response = await Axios.post(newUrl,data)
    if(response.data.success){
        console.log(response.data);
        setToken(response.data.token)
        localStorage.setItem("token",response.data.token)
        toast.success(response.data.message)
        setShowLogin(false)
        console.log("authenticated",data);
    }else{
        toast.error(response.data.message || "error")
    }

}

  return (
    <div className='absolute z-10 w-full h-full bg-[#00000090] grid'>
        <form action="" onSubmit={onLogin} className='place-self-center min-w-[23vw] max-w-[380px] text-[#808080] bg-[#ffff] flex flex-col gap-7 pt-[25px] pr-[25px] pb-[30px] pl-[30px] rounded-lg text-sm animate-fadeIn duration-300'>
            <div className="flex items-center justify-between text-black">
                <h2 className='font-semibold text-xl'>{currState}</h2>
                <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" className='w-4 cursor-pointer' />
            </div>
            <div className='flex flex-col gap-5'>
                {currState==="Login"?<></>:<input type="text" name='name' onChange={onChangeHandler} value={data.name} placeholder='Your name' required className='border-2 p-[10px] border-[#c9c9c9] outline-none rounded-md'/>}
                <input type="email" name='email' onChange={onChangeHandler} value={data.email} placeholder='Your email' required className='border-2 p-[10px] border-[#c9c9c9] outline-none rounded-md'/>
                <input type="password" name='password' onChange={onChangeHandler} value={data.password} placeholder='Password' required className='border-2 p-[10px] border-[#c9c9c9] outline-none rounded-md'/>
            </div>
            <button type='submit' className='cursor-pointer border-none p-[10px] rounded-lg text-[#ffff] bg-red-500 text-[15px]'>{currState==="Sign Up"?"create account":"Login"}</button>
            <div className="flex items-start gap-2 mt-[-15px]">
                <input type="checkbox" required className='mt-[5px]'/>
                <p>By continuing, i agree to the terms of use & privacy policy.</p>
            </div>
            {currState==="Login" ? <p className='text-center'>Create a new account? <span onClick={()=>setCurrState("Sign Up")} className='cursor-pointer text-red-500 font-medium'>click here</span></p>
            :<p className='text-center'>already have an account? <span onClick={()=>setCurrState("Login")} className='cursor-pointer text-red-500 font-medium'>Login here</span></p>}
        </form>
    </div>
  )
}

export default Login
