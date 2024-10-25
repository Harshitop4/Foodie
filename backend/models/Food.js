const mongoose=require('mongoose');
const CartItem = require('./CartItem');

const {Schema}=mongoose;

const FoodSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    options: {
        half: {
          type: Number,
          required: true,
        },
        medium: {
          type: Number,
          required: true,
        },
        full: {
          type: Number,
          required: true,
        }
      },
    image:{
        type:String,
        required:true
    },
})

FoodSchema.pre('remove',async function (next){
  try {
      await CartItem.updateMany({foodId:this._id},{foodId:null})
      next();
  } catch (error) {
      next(error)
  }
})

const Food=mongoose.model('Food',FoodSchema);

module.exports=Food;