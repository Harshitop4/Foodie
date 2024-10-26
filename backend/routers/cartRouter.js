const express = require('express');
const CartItem = require('../models/CartItem');
const Cart = require('../models/Cart');
const Food = require('../models/Food');
const jwt = require('jsonwebtoken');
const { default: mongoose } = require('mongoose');

const router = express.Router();
const {ObjectId}=mongoose.Types;

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(400).send("Bad Credentials");

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        return res.status(400).send("Invalid Token");
    }
}

router.get('/', verifyToken, async (req, res) => {

    const id = req.user.id;

    try {
        let cart = await Cart.findOne({ userId: id })
        if (!cart) {
            cart = new Cart({ userId: id, totalItems: 0, totalPrice: 0 })
            await cart.save();
        }
        const cartItems = await CartItem.find({ cartId: cart._id })

        let foodList = await Promise.all(
            cartItems.map(async (item) => {
                const food = await Food.findById(item.foodId);
                return {
                    id:item._id.toString(),
                    name: food.name,
                    qt: item.qt,
                    price: item.price
                };
            })
        );
        foodList=foodList.reverse();
        res.send(foodList)

    } catch (error) {
        res.status(400).send(error);
    }
})

router.post('/', verifyToken, async (req, res) => {

    const userid = req.user.id;
    const { body: { ind, qt, price } } = req;

    try {
        let cart = await Cart.findOne({ userId: userid })
        if (!cart) {
            cart = new Cart({ userId: userid, totalItems: 0, totalPrice: 0 })
            await cart.save();
        }
        const cartItems = await CartItem.find({ cartId: cart._id })
        const foodsList = await Food.find({});
        const food = foodsList[ind];
        const cartItem = cartItems.find((item) => (item.foodId.equals(food._id) && item.price === Number(price)))
        let q = Number(qt);
        if (cartItem) {
            q += cartItem.qt;
            await CartItem.deleteOne({ foodId: food._id, price })
        }
        temp = new CartItem({ cartId: cart._id, foodId: food._id, qt: q, price: price })
        await temp.save();
        await Cart.updateOne({_id:cart._id},{totalItems:cart.totalItems+q})
        res.send(temp);
    } catch (error) {
        res.status(400).send(error);
    }
})

router.delete('/', verifyToken, async (req, res) => {

    const id = req.user.id;

    try {
        let cart = await Cart.findOne({ userId: id })
        if (!cart) {
            return res.status(400).send("No Cart Found")
        }
        await CartItem.deleteMany({ cartId: cart._id })
        await Cart.updateOne({_id:cart._id},{totalItems:0})
        res.status(200).send()
        
    } catch (error) {
        res.status(400).send(error);
    }
})

router.delete('/:cid', verifyToken, async (req, res) => {
    
    const id = req.user.id;
    const cid=new ObjectId(req.params.cid);
    
    try {
        let cart = await Cart.findOne({ userId: id })
        if (!cart) {
            return res.status(400).send("No Cart Found")
        }
        const cartItem=await CartItem.findById(cid);
        const qt=cartItem.qt;
        await CartItem.deleteOne({_id:cid})
        await Cart.updateOne({_id:cart._id},{totalItems:cart.totalItems-qt})
        res.status(200).send()

    } catch (error) {
        res.status(400).send(error);
    }
})

// TO get TotalItems
router.get('/totalItems', verifyToken, async (req, res) => {

    const id = req.user.id;

    try {
        let cart = await Cart.findOne({ userId: id })
        if (!cart) {
            cart = new Cart({ userId: id, totalItems: 0, totalPrice: 0 })
            await cart.save();
        }
        res.json({'totalItems':cart.totalItems})

    } catch (error) {
        res.status(400).send(error);
    }
})

module.exports = router;