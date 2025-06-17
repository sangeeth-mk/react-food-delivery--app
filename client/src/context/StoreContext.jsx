import { createContext, useEffect, useState } from "react";
import Axios from 'axios';

export const StoreContext = createContext(null)

const StoreContextProvider = (props)=>{

    const [cartItems,setCartItems] = useState({})

    const url = "https://react-food-delivery-app-3tbn.onrender.com"

    const [token,setToken] = useState("")
    const [foodList,setFoodlist] = useState([])

    const addToCart = async(itemId)=>{

        if(!cartItems[itemId]){
            setCartItems((prev)=>({...prev,[itemId]:1}))
        } else {
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }

        if(token){
            await Axios.post(`${url}/api/cart/add`,{itemId},{headers:{token}})
        }
    }


    const removeFromcart = async(itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if(token){
            await Axios.post(`${url}/api/cart/remove`,{itemId},{headers:{token}})
        }
    }


    const getTotalCartAmount = ()=>{

        let totalAmount = 0;

        for (const item in cartItems){

            if(cartItems[item]>0){
                let itemInfo = foodList.find((product)=>product._id === item);
                totalAmount += itemInfo.price * cartItems[item]
            }

        }
        return totalAmount;
    }


    const fetchFoodList = async()=>{

        const response = await Axios.get(`${url}/api/items`)
        setFoodlist(response.data.Items)
    }

    const loadCartData = async (token)=>{
        const response = await Axios.post(`${url}/api/cart/get`,{},{headers:{token}})
        console.log("cartdata is",response);
        setCartItems(response.data.cartData)
    }

    useEffect(()=>{
       
        async function loadData(){
            await fetchFoodList()
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"))
                await loadCartData(localStorage.getItem("token"))
            }
          }

        loadData()

    },[])

    const contextValue = {
        foodList,
        setFoodlist,
        cartItems,
        setCartItems,
        addToCart,
        removeFromcart,
        getTotalCartAmount,
        url,
        token,
        setToken
    }

    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )

}

export default StoreContextProvider;
