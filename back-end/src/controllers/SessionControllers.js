import { checkPassword } from "../services/auth"
import User from "../models/users"
import  Jwt  from "jsonwebtoken"
import auth from "../config/auth"

class SessionControllers{

    async create(req,res){

        try {

            const {email,password}=await req.body

            const user = await User.findOne({email})

            if(!user){
                return res.status(401).json({authenticationError:'user / password invalid'})
            }
            
            if(!await checkPassword(user,password)){
                return res.status(401).json({authenticationError:'user / password invalid'})
            }

            const {id,userName}=user

            return res.json({
                user:{
                    id,
                    email,
                    userName,
                    password
                },
                token:Jwt.sign({id},auth.secret,{expiresIn:auth.expiresIn})
            })
            
        } catch (err) {
            console.log(err)
            return res.status(401).json({error:'internal error'})
        }
        
    }

}

export default new SessionControllers()