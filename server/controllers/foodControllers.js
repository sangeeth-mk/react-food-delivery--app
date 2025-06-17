import foodModel from '../models/FoodModel.js';
import fs from 'fs';

const createFood = async (req,res)=>{

    const {name,price,category,description } = req.body

    const image = `${req.file.filename}`

    try { 

        if(!name || !price || !category || !description || !image){
            return res.json({success:false,message:"all fields are required"})
        }

        const existingItem = await foodModel.findOne({name})

        if (existingItem){
            return res.json({ success: false, message: "this item has already been added" });
        }

        const newItem = new foodModel({
            name,
            price,
            description,
            category,
            image
        })

        const savedFood = await newItem.save()

        res.json({success:true,message:"foodItem added successfully",item:savedFood})
        
    } catch (error) {
        console.log(error);
        res.json({sucess:false,message:"Error"})
    }
}

const getFood = async (req,res)=>{

    try {

        const Items = await foodModel.find({})

        return res.json({success:true,total:Items.length,Items})

    } catch (error) {
        return res.json({success:false,message:error.message})
    }
}


const getFoodById = async (req,res)=>{

 const {foodId} = req.body;
    try {

        const food = await foodModel.findOne(foodId)

        if (!food){
            return res.json({success:false,message:`fooditem with the id:${foodId} not found`})
        }

        return res.json({success:true,item:food})

    } catch (error) {
        return res.json({success:false,message:error.message})
    }
}


const updateFoodById = async (req, res) => {
    const { id } = req.params; 
    const { name, price, category, description } = req.body; 
    let image;
    if (req.file) {
        image = `${req.file.filename}`; 
    }

    try {
        if (!name || !price || !category || !description) {
            return res.json({success:false,message:"All fields except image are required"});
        }

        const updatedFood = await foodModel.findByIdAndUpdate(
            id,
            {
                name,
                price,
                description,
                category,
                ...(image && { image }) 
            },
            { new: true } 
        );

        if (!updatedFood) {
            return res.json({success:false,message:'Fooditem not found'});
        }

        res.json({ success:true,message: "Food item successfully updated", data: updatedFood });
    } catch (error) {
        return res.json({success:false,message:error.message})
    }
}


const deleteFoodById = async (req,res)=>{

    const {foodId} = req.body;

    try {
 
        const deletedItem = await foodModel.findOne({foodId})

        if(!deletedItem){  
            return res.json({success:false,message:"item not found"})
        }

        fs.unlink(`uploads/${deletedItem.image}`,()=>{})

        await foodModel.findOneAndDelete(foodId)

        return res.json({success:true,message:"item deleted successfully"})

    } catch (error) {
        return res.json({success:false,message:error.message})

    }
}

const foodControllers = { createFood, getFood, getFoodById, updateFoodById, deleteFoodById };

export default foodControllers;