import mongoose from "mongoose";

const repositorySchema=mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },

        url:{
            type:String,
            required:true,
            unique:true
        },

        userId:{
            type:String,
            require:true,
        }
      
    },
    {
        timesTamps:true
    }
)

export default mongoose.model('Repository',repositorySchema)