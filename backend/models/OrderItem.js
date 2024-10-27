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

OrderItemSchema.pre('save', function (next) {
    this.price = parseFloat(this.price.toFixed(2));
    next();
  });

const OrderItem=mongoose.model('OrderItem',OrderItemSchema);

module.exports=OrderItem;