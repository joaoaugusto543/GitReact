import Repository from '../models/repository'
import User from '../models/users'

class RepositoryControllers{
    async index(req,res){

        try {
            const idUser=req.params.idUser

            const user= await User.findById(idUser)

            const {q}=req.query

            if(!user){
                return res.status(404).json({message:'User does not exist'})
            }

            let query={}

            if(q){
                query={url:{$regex:q}}
            }
            
            const repositorys= await Repository.find({userId:idUser,...query})

            return res.status(200).json(repositorys)

        } catch (err) {
            console.log(err)
            return res.status(500).json({error:'An error occurred while trying to list the repositories'})
        }

        
    }

    async create(req,res){

        try {

            const idUser=await req.params.idUser

            const user=await User.findById(idUser)

            const {name,url}=await req.body

            const regexName= /[^a-zà-ú^A-ZÀ-Ú ]/i
            
            if(regexName.test(name)){
                return res.status(400).json({messageinvalidNameMessage:'Name invalid'}) 
            }

            if(!user){
                return res.status(404).json({userNotFound:'User does not exist'}) 
            }
            
            const repository= await Repository.findOne({name,url,userId:idUser})
            
            if(repository){
                return res.status(422).json({ExistingRepository:`the ${name} repository already exists`}) 
            }

            const newRepository=await Repository.create({name,url,userId:idUser})

            return res.status(200).json(newRepository)
   
        } catch (err) {
            console.log(err)
            return res.status(500).json({error:'An error occurred while creating the repository'})
        }
        
    }

    async destroy(req,res){
        try {

            const idUser=await req.params.idUser

            const idRepository=await req.params.idRepository

            const user=await User.findById(idUser)

            const repository=await Repository.findById(idRepository)

            if(!user){
                return res.status(422).json({message:'User does not exist'})
            }

            if(!repository){
                return res.status(422).json({message:'Repository does not exist'})
            }

            await Repository.findByIdAndRemove(idRepository)

            return res.status(200).json(repository)


        } catch (err) {

            console.log(err)
            return res.status(500).json({error:'An error occurred while deleting the repository'})

        }

    }

    async update(req,res){

        try {

            const idUser=await req.params.idUser
            const idRepository=await req.params.idRepository
    
            const {name,url}=await req.body

            const regexName= /[^a-zà-ú^A-ZÀ-Ú ]/i
            
            const user=await User.findById(idUser)
            const repository=await Repository.findById(idRepository)
            const namesRepositorys=await Repository.findOne({name,userId:idUser})

            if(!user){
                return res.status(422).json({message:'User does not exist'})
            }
            
            if(!repository){
                return res.status(422).json({message:'Repository does not exist'})
            }

            if(namesRepositorys && name !== repository.name){
                return res.status(422).json({ExistingRepository:`the ${name} repository already exists`})
            }
            
            if(regexName.test(name)){
                return res.status(400).json({messageinvalidNameMessage:'Name invalid'}) 
            }

            

            const newRepository=await Repository.findByIdAndUpdate(idRepository,{name:name,url:url,userId:idUser},{new:true})

            return res.status(201).json(newRepository)
            
        } catch (err) {
            console.log(err)
            return res.status(500).json({error:'An error occurred while updating the repository'})
        }



    }
}

export default new RepositoryControllers()