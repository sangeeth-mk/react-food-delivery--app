import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: '3d' });
};

const login = async (req,res)=>{

    const { email,password } = req.body;

    try {

        const user = await userModel.findOne({email})

        if(!user){
            return res.json({success:false,message:"user with this email was not found"})
        }

        const isMatch = await bcrypt.compare(password,user.password)

        if(!isMatch){
            return res.json({success:false,message:"incorrect password"})
        }

        const token = createToken(user._id)

        return res.json({success:true,message:"login successful",token})
        
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:"login failed!"})
    }
}


const register = async (req,res)=>{

    const {name,email,password} = req.body;

    try {

        if(!name || !email || !password){

            return res.json({success:false,message:"all fields are required"})
        }

        const existingUser = await userModel.findOne({email})

        if(existingUser){
         return res.json({success:false,message:"user with this email id has already been registered"})
        }

        if(!validator.isEmail(email)){
            return res.json({success:false,message:"please enter a valid email."})
        }

        if(password.length <8){
            return res.json({success:false,message:"please enter a strong password."})
        }

        const salt = await bcrypt.genSalt(10)

        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new userModel({
            name,
            email,
            password:hashedPassword
        })

        const user = await newUser.save() 

        const token = createToken(user._id)

        return res.json({success:true,message:"user registered",token})

    } catch (error) {
        console.log(error);
        return res.json({success:false,message:"registration failed!"})
    }
}

const userControllers = { login, register };

export default userControllers;