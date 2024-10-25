const express= require('express');

const router=express.Router();


router.get('/',(req,res)=>{
    res.send({foods:global.foods,categories:global.categories});
})


module.exports=router;