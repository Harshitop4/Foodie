const mongoose=require('mongoose');

const {Schema}=mongoose;

const OrderItemSchema=new Schema({
    orderId:{
        type:Schema.Types.ObjectId,
        ref:'Order',
        required:true
    },
    foodId:{
        type:Schema.Types.ObjectId,
        ref:'Food',
        required:true
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

const OrderItem=mongoose.model('OrderItem',OrderItemSchema);

module.exports=OrderItem;