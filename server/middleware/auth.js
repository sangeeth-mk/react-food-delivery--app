import jwt from 'jsonwebtoken';

const authMiddleware = async (req,res,next)=>{

    const {token} = req.headers;

    if(!token){
        return res.status(400).json({success:false,message:"not Authorised login again"})
    }

    try {
        const token_decode = jwt.verify(token,process.env.JWT_SECRET_KEY) 

        req.body.userId = token_decode.id;

        next();

    } catch (error) {
        console.log(error);
        return res.status(400).json({success:false,message:"Error"})
    }
}

export default authMiddleware;