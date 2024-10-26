const mongoose=require('mongoose');

const {Schema}=mongoose;

const OrderSchema=new Schema({
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
    },
    deliveryAddress:{
        type:String,
        required:true
    },
    MobileNumber:{
        type:String,
        required:true
    },
    orderedAt: {
        type: Date,
        default: Date.now
    }
})

const Order=mongoose.model('Order',OrderSchema);

module.exports=Order;