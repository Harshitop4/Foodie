const mongoose = require('mongoose');

const { Schema } = mongoose;

const CartItemSchema = new Schema({
    cartId: {
        type: Schema.Types.ObjectId,
        ref: 'Cart',
        required: true
    },
    foodId: {
        type: Schema.Types.ObjectId,
        ref: 'Food',
        // required:true
    },
    qt: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})

CartItemSchema.pre('save', function (next) {
    this.price = parseFloat(this.price.toFixed(2));
    next();
});

const CartItem = mongoose.model('CartItem', CartItemSchema);

module.exports = CartItem;