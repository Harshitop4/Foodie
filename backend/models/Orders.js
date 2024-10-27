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

OrderSchema.pre('save', function (next) {
    this.totalPrice = parseFloat(this.totalPrice.toFixed(2));
    next();
  });

const Order=mongoose.model('Order',OrderSchema);

module.exports=Order;