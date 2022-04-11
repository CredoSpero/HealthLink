const router=require('express').Router();
const UserModel=require('../models/Users');

router
    .route("/")
    .get((req,res) => {
        UserModel.find({}, (err,result)=>{
            if (err){
                res.json(err);
            } else{
                res.json(result);
            }
        });
    })
    .post(async (req,res) => {
        const user=req.body;
        const newUser=new UserModel(user);
        await newUser.save();

        res.json(user);
    });

router
    .route("/test")
    .get((req,res)=>{
        res.send('we are on test');
});

module.exports=router;