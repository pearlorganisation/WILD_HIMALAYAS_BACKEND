import mongoose, { Schema } from "mongoose";

const tourSchema = new mongoose.Schema({
price:{
    type:Number,
    required:[true,"Price is Required"]
},
banner:{
    type:{},
    required:[true,"Banner is Required"]
},
title:{
    type:String,
    required:[true,"Title is Required"]
},
activities:{
    type:mongoose.Types.ObjectId,
    ref:"Activities",
    required:true
},
description:{
    type:String,
    required:[true,"Description is Required"]
},
tripDuration:{
    type:String,
    required:[true,"Duration is Required"]
},
difficulty:{
    type:String,
    required:[true,"Difficulty is Required"]
},
maxGroupSize:{
    type:String,
    required:[true,"Difficulty is Required"]
},
highestPoint:{
    type:String,
    required:[true,"Highest Point is Required"]
},
tripHighlights:{
    type:[],
    required:[true,"Highlights is required"]
}
},{timestamps:true})

export default mongoose.model("tour",tourSchema)