import mongoose from "mongoose";

const contactUsSchema = new mongoose.Schema({
name:{
    type:String,
    required:[true,"name is required!"]
},
email:{
    type:String,
    required:[true,"Email is required!"]
},
phoneNumber:{
    type:Number,
    required:[true,"PhoneNumber is required!"]
},
address:{
    type:String,
    required:[true,"Address is required"]
},
message:{
    type:String,
    required:[true,"Message is required"]
}
})

export default mongoose.model("contactUs",contactUsSchema)