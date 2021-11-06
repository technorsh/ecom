const express = require('express');
const router = express.Router();

const Book = require('./../connection/db2.js');

//ROUTES FOR ALL Books
router.get("/", (req,res,next) => {
    Book.find( (err,foundBooks) => {
        if(err){
            return res.send(err);
        } else{
            res.statusCode = 200;
            return res.send(foundBooks);
        }
    })
})
router.post("/", (req,res,next) => {
    const newBook = new Book({
        title: req.body.title,
        author: req.body.author,
        version: req.body.version,
        publication: req.body.publication,
        isbn: req.body.isbn,
        rating: req.body.rating,
        category: req.body.category,
        quantity: req.body.quantity
    });
    
    Book.findOne(
        {isbn: req.body.isbn}, 
        (err,foundBook) => {
            if(foundBook){
                res.statusCode = 409;
                return res.send({
                    message: 'Book with this ISBN already present'
                });
            } else if(err){
                res.send(err);
            }
            else{
                newBook.save( (er) => {
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
    Book.deleteMany( (err) => {
        if(err){
            return res.send(err);
        } else{
            res.statusCode = 200;
            return res.send({ message: "Successfully deleted all Books!" } );
        }
    })
});

//ROUTES FOR A SPECIFIC Book
router.get("/:isbn", (req,res,next) => {
    Book.findOne({isbn: req.params.isbn}, (err,foundBook) => {
        if(foundBook){
            res.statusCode = 200;
            return res.send(foundBook);
        } else{
            return res.send({ message: "No Book found!" } );
        }
    });
})
router.put("/:isbn", (req,res,next) =>  {
    Book.findOneAndUpdate(
        {isbn: req.params.isbn}, 
        {rating: req.body.rating, quantity: req.body.quantity}, 
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
router.patch("/:isbn", (req,res,next) => {
    Book.updateOne(
        {isbn: req.params.isbn},
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
router.delete("/:isbn", (req,res,next) =>  {
    Book.findOne(
        {isbn: req.params.isbn},
        (err,foundBook) => {
            if(foundBook){
                Book.remove({isbn: req.params.isbn}, function (er) {
                    if(er)
                        return res.send(er);
                    else{
                        res.statusCode = 200;
                        return res.send({ message: "Successfully deleted" } );
                    }
                })
            } 
            else{
                return res.send({ message: "Book not found!" } );
            }
    })
});

//Fetch 10 books in most recently added order
router.get("/search/recentlyadded", (req,res,next) => {
    Book
    .find({})
    .sort({createdAt: -1})
    .limit(10)
    .exec(function (err,foundBooks) {
        if(foundBooks){
            res.statusCode = 200;
            return res.send(foundBooks);
        } else{
            return res.send({ message: "No Book found!" } );
        }
    })
})

//Search by title - full text search
router.get("/search/title/:reqtitle", (req,res,next) => {
    Book
    .find({$text: {$search: req.params.reqtitle}})
    .exec(function (err,foundBooks) {
        if(foundBooks){
            res.statusCode = 200;
            return res.send(foundBooks);
        } else{
            return res.send({ message: "No Book found!" } );
        }
    })
})
//Search by title - partial text search
router.get("/search/related/:reqtitle", (req,res,next) => {
    Book
    .find({ "title": { "$regex": req.params.reqtitle, "$options": "i" } })
    .exec(function (err,foundBooks) {
        if(foundBooks){
            res.statusCode = 200;
            return res.send(foundBooks);
        } else{
            return res.send({ message: "No Book found!" } );
        }
    })
})

module.exports = router;