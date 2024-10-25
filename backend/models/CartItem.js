const mongoose=require('mongoose');

const {Schema}=mongoose;

const CartItemSchema=new Schema({
    cartId:{
        type:Schema.Types.ObjectId,
        ref:'Cart',
        required:true
    },
    foodId:{
        type:Schema.Types.ObjectId,
        ref:'Food',
        // required:true
    },
    qt:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    }
})

const CartItem=mongoose.model('CartItem',CartItemSchema);

module.exports=CartItem;