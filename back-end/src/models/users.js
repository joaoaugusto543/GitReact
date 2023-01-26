import mongoose from "mongoose";

const userSchema=mongoose.Schema(
    {
        email:{
            type:String,
            required:true,
            index:{
                unique:true
            }
        },

        
        password:{
            type:String,
            required:true
        },
        
        userName:{
            type:String,
            required:true,
        },
    },

    {
        timesTamps:true
    }
)

export default mongoose.model('User',userSchema)