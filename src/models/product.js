import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
productName:{
    type:String,
    required:[true,"Product Name is Required"]
},
description:{
    type:String,
    required:[true,"Description is Required"]
},
price:[{
    size:String,
    mrp:Number,
    price:Number
}],
discount: {
    type: Number,
    required:[true,"Discount is Required"],
    default: 0
    },
banners:[]

},{
    timestamps:true
})

productSchema.methods.calculateTotalPrice = function() {
    return this.price.map((item)=>{
      return {...item,price:Math.round(item.mrp * (1 - (this.discount || 0)/ 100))}
    });
  }

export default mongoose.model("product", productSchema)