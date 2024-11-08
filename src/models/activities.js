import mongoose from "mongoose";

const activitiesSchema = new mongoose.Schema(
  {
title: {
    type:String,
    required: [true,"Title is Required"]
},
description:{
    type:String,
    required:[true,"Discription is required"]
},
banners:{
    type:[],
    required:[true,"Banners is required"]
}

  },
  { timestamps: true })

  export default mongoose.model("activity", activitiesSchema);