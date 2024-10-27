const mongoose=require('mongoose');
const CartItem = require('./CartItem');

const {Schema}=mongoose;

const CartSchema=new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    totalItems:{
        type:Number,
        required:true
    },
    totalPrice:{
        type:Number,
        required:true
    }
})

CartSchema.pre('save', function (next) {
    this.totalPrice = parseFloat(this.totalPrice.toFixed(2));
    next();
  });

CartSchema.pre('remove',async function(next){
    try {
        await CartItem.deleteMany({cartId:this._id})
        next();
    } catch (error) {
        next(error)
    }
})


const Cart=mongoose.model('Cart',CartSchema);

module.exports=Cart;