const express=require('express');
require('dotenv').config();
const mongoose  = require('mongoose');
const userRouter= require('./routers/userRouter')
const foodRouter= require('./routers/foodRouter')
const cartRouter= require('./routers/cartRouter')
const Cart=require('./models/Cart')
const CartItem=require('./models/CartItem')
const Food=require('./models/Food')
const cors=require('cors');
const jwt=require('jsonwebtoken');
const OrderItem = require('./models/OrderItem');
const Order = require('./models/Orders');
const User = require('./models/User');

const app=express();
const PORT=5000;

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected Successfully');
        
        const foodList = await mongoose.connection.db.collection('foods');
        global.foods=await foodList.find({}).toArray();
        
        const categoryList = await mongoose.connection.db.collection('categories');
        global.categories=await categoryList.find({}).toArray();
        
    } catch (err) {
        console.log(`Error : ${err}`);
    }
};

connectDB();

app.use(cors());

app.use(express.json());

app.get('/',(req,res)=>{
    res.send("Hii");
})

app.use('/api/users',userRouter)

app.use('/api/foods',foodRouter)

app.use('/api/cart',cartRouter);





app.listen(PORT,()=>{
    console.log(`Example app listening on Port ${PORT}`)
})
