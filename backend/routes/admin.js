const express = require('express');
const router = express.Router();

const User = require('./../connection/db.js');

//ROUTES FOR ALL Admins
router.get("/", (req,res,next) => {
    User.find({isAdmin: true}, (err,foundUsers) => {
        if(err){
            return res.send(err);
        } else{
            res.statusCode = 200;
            return res.send(foundUsers);
        }
    })
})
router.post("/", (req,res,next) => {
    const newUser = new User({
        name: req.body.name,
        email:req.body.email,
        phone: req.body.phone,
        age: req.body.age,
        isAdmin: true
    });
    
    User.findOne(
        {email: req.body.email}, 
        (err,foundUser) => {
            if(foundUser){
                res.statusCode = 409;
                return res.send({ message: 'This email is taken' });
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
    User.deleteMany( 
        {isAdmin: true}, 
        (err) => {
            if(err){
                return res.send(err);
            } else{
                res.statusCode = 200;
                return res.send({ message: "Successfully deleted all admins!" } );
            }
    })
});

//ROUTES FOR A SPECIFIC Admin
router.get("/email", (req,res,next) => {
    User.findOne(
        {email: req.params.email,isAdmin: true}, 
        (err,foundUser) => {
            if(foundUser){
                res.statusCode = 200;
                return res.send(foundUser);
            } else{
                return res.send({ message: "No Admin found!" } );
            }
    });
})
router.put("/:email", (req,res,next) =>  {
    User.findOneAndUpdate(
        {email: req.params.email,isAdmin:true}, 
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
        {email: req.params.email,isAdmin:true},
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
        {email: req.params.email,isAdmin: true},
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
                return res.send({ message: "Admin not found!" } );
            }
    })
});

module.exports = router;