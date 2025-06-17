import express from 'express';
import foodControllers from '../controllers/foodControllers.js';
import multer from 'multer'; 

const Router = express.Router()

const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})

Router.get("/items",foodControllers.getFood)

Router.get("/items/:id",foodControllers.getFoodById)

Router.post("/items/add",upload.single("image"),foodControllers.createFood)

Router.put("/items/:id",foodControllers.updateFoodById)

Router.delete("/items/:id",foodControllers.deleteFoodById)

export default Router;