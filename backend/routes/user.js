const express = require('express');
const router = express.Router();

const User = require('./../connection/db.js');

//ROUTES FOR ALL Users 
router.get("/", (req,res,next) => {
    User.find( (err,foundUsers) => {
        if(err){
            res.statusCode = 200;
            return res.send(err);
        } else{
            return res.send(foundUsers);
        }
    })
})
router.post("/", (req,res,next) => {
    const newUser = new User({
        name: req.body.name,
        email:req.body.email,
        phone: req.body.phone,
        age: req.body.age
    });
    
    User.findOne(
        {email: req.body.email}, 
        (err,foundUser) => {
            if(foundUser){
                return res.status(409).send({
                    message: 'This email is already in use!'
                });
            } else if(err){
                res.send(err);
            }
            else{
                newUser.save( (er) => {
                    if(er){
                        res.send(er);
                    } else{ 
                        res.statusCode = 201;
                        res.send({ message: 'Successfully saved!' });
                    }
                });
            }
    });
})
router.delete("/", (req,res,next) => {
    User.deleteMany( (err) => {
        if(err){
            res.statusCode = 200;
            return res.send(err);
        } else{
            return res.send({ message: "Successfully deleted all Users!" } );
        }
    })
});

//ROUTES FOR A SPECIFIC User
router.get("/:email", (req,res,next) => {
    User.findOne(
        {email: req.params.email}, 
        (err,foundUser) => {
            if(foundUser){
                res.statusCode = 200;
                return res.send(foundUser);
            } else{
                return res.send({ message: "No User found!" } );
            }
    });
})
router.put("/:email", (req,res,next) =>  {
    User.findOneAndUpdate(
        {email: req.params.email}, 
        {name: req.body.name}, 
        (err) => {
            if(err){
                return res.send(err);
            } else{
                res.statusCode = 200;
                return res.send({ message: "Successfully updated!" } );
            }
        }
    );
})
router.patch("/:email", (req,res,next) => {
    User.updateOne(
        {email: req.params.email},
        {$set : req.body},
        (err) => {
            if(err){
                res.send(err);
            } else{
                res.statusCode = 200;
                return res.send({ message: "Successfully updated!" } );
            }
        }
    );
})
router.delete("/:email", (req,res,next) =>  {
    User.findOne(
        {email: req.params.email}, 
        (err,foundUser) => {
            if(foundUser){
                User.remove(
                    {email: req.params.email}, 
                    (er) => {
                        if(er)
                            return res.send(er);
                        else{
                            res.statusCode = 200;
                            return res.send({ message: "Successfully deleted" } );
                    }
                })
            } 
            else{
                return res.send({ message: "User not found!" } );
            }
    })
});

module.exports = router;