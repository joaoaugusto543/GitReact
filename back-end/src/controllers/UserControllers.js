import User from '../models/users'
import {checkPassword, createPasswordHash} from '../services/auth'

class UserControllers{

    async index(req,res){
        try{
            const users=await User.find()
            return res.json(users)
        }catch(err){
            console.log(err)
            return res.status(500).json({error:"Internal server error."})
        }
       
    }

    async create(req,res){
        try {

            const {email,password,userName}=await req.body

            const regexEmail=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

            const regexUserName= /[^a-zà-ú^A-ZÀ-Ú ]/i
            
            const user= await User.findOne({email})
            
            const usersNames=await User.findOne({userName:userName})

            const mistakes={}

            if(user){
                return res.status(422).json({emailAlreadyExists:`User ${email} already exists`})
            }

            if(usersNames){
                return res.status(422).json({errorUserNameAlreadyExists:'userName already exists'})
            }

           if(!regexEmail.test(email)){
                mistakes.errorEmail='invalid email'
           }

           if(regexUserName.test(userName)){
                mistakes.errorUserName='invalid UserName'
           }

           if(password.length<8){
                mistakes.errorPassword='invalid password'
           }
            
           if(mistakes.errorEmail || mistakes.errorUserName || mistakes.errorPasswords){
                return res.status(400).json(mistakes)
           }
         
            const encryptedPassword=await createPasswordHash(password)


           const newUser= await User.create({email,password:encryptedPassword,userName})

            return res.status(201).json(newUser)

        } catch (err) {
            console.log(err)
            return res.status(500).json({error:'There was an error creating the account'})
        }
    }

    async show(req,res){
        try {
            
            const id=req.params.id

            const user= await User.findById(id)

            if(!user){
                return res.status(422).json({message:'User does not exist'})
            }

            return res.status(200).json(user)

        } catch (err) {
            console.log(err)
            return res.status(500).json({error:'There was an error locating the user'})
        }
    }

    async destroy(req,res){

        try {

            const id=req.params.id
    
            const user=await User.findByIdAndDelete(id)

            if(!user){
                return res.status(422).json({message:'User does not exist'})
            }
            
           return res.status(201).json(user)
            
        } catch (err) {
            
            console.log(err)
            return res.status(500).json({message:'An error occurred while deleting the user'})

        }
    }

    async update(req,res){

        try {
            
            const id=req.params.id
            
            const {email,userName}=req.body

            const user=await User.findById(id)

            const usersNames=await User.findOne({userName:userName})
            const usersEmail=await User.findOne({email:email})

            const regexEmail=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

            const regexUserName= /[^a-zà-ú^A-ZÀ-Ú ]/i

            const mistakes={}

            if(!user){
                return res.status(422).json({message:'User does not exist'})
            }

            if(usersEmail && email !== user.email){
                return res.status(422).json({emailAlreadyExists:`User ${email} already exists`})
            }

            if(usersNames && userName !== user.userName){
                return res.status(422).json({errorUserNameAlreadyExists:'userName already exists'})
            }

           if(!regexEmail.test(email)){
                mistakes.errorEmail='invalid email'
           }

           if(regexUserName.test(userName)){
                mistakes.errorUserName='invalid UserName'
           }

           if(mistakes.errorEmail || mistakes.errorUserName || mistakes.errorUserNameAlreadyExists){
                return res.status(400).json(mistakes)
           }

            const userUpdate= await User.findByIdAndUpdate(id,{email,password:user.password,userName},{new:true})

            return await res.status(201).json(userUpdate)

        } catch (err) {

            console.log(err)
            return res.status(500).json({error:'An error occurred while updating the user'})

        }

    }

    async updatePassword(req,res){

        try {

            const idUser=await req.params.id
    
            const user=await User.findById(idUser)
    
            const {password,newPassword}=await req.body

            if(!user){
                return res.status(422).json({message:'User does not exist'}) 
            }

            if(!await checkPassword(user,password)){
                return res.status(401).json({errorPassword:'error when changing password'})
            }

            if(newPassword.length<8){
                return res.status(401).json({errorPassword:'error when changing password'})
            }

            const encryptedPassword=await createPasswordHash(newPassword)
        
            const userUpdate= await User.findByIdAndUpdate(idUser,{email:user.email,password:encryptedPassword,userName:user.userName},{new:true})
    
            res.status(201).json(userUpdate)
            
        } catch (error) {
            console.log(error)
            res.status(201).json({error:'internal error'})
        }
        
    }

}

export default new UserControllers()
