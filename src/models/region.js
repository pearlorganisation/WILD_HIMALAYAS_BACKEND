import mongoose from "mongoose"

const regionSchema = new mongoose.Schema({
name:{
    type:String,
    required:[true,"Region name is Required"]
},
},{
    timestamps:true
})


export default mongoose.model("region", regionSchema)