import userModel from "../models/userModel.js";

const addToCart = async (req,res)=>{


    try {

        const userData = await userModel.findOne({_id:req.body.userId});

        let cartData = await userData.cartData;

        if(!cartData[req.body.itemId]){

            cartData[req.body.itemId] = 1;

        } else {
            cartData[req.body.itemId] += 1;
        }
        
        await userModel.findByIdAndUpdate(req.body.userId,{cartData})

        return res.status(200).json({success:true,message:"Added to cart"})
        
    } catch (error) {

        console.log(error);

        res.json({success:false,message:"Error"})

    }
}

const removeFromCart = async (req,res)=>{

    try {

        let userData = await userModel.findById(req.body.userId)

        let cartData = await userData.cartData;

        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId] -= 1;
        }

        await userModel.findByIdAndUpdate(req.body.userId,{cartData})

        return res.status(200).json({success:true,message:"removed from cart"})
        
    } catch (error) {

        console.log(error);

        res.json({success:false,message:"error"})

    }
}

const getCart = async (req,res)=>{

    try {

        let userData = await userModel.findById(req.body.userId)

        let cartData = await userData.cartData;

        return res.status(200).json({success:true,cartData})
        
    } catch (error) {
        
        console.log(error);

        res.json({success:false,message:"error"})
    }
}

const cartControllers = {addToCart,removeFromCart,getCart}

export default cartControllers