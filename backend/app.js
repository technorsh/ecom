const express=require("express");
const bodyParser=require("body-parser");
const ejs = require("ejs");
const mongoose =require("mongoose")

const app=express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

mongoose.connect("mongodb://localhost:27017/ecomDB" , { useNewUrlParser: true,  useUnifiedTopology:true});

const bookSchema =new mongoose.Schema({
    title: String,
    author: String,
    version: String,
    publication: String,
    isbn: {type: String, required: true},
    rating: Number,
    category: String,
    quantity: Number
})

const Book= mongoose.model("Book",bookSchema);

//ROUTES FOR ALL BOOKS 
app.route("/books")
.get(function (req,res) {
    Book.find(function (err,foundBooks) {
        if(err){
            res.send(err);
        } else{
            res.send(foundBooks);
        }
    })
})
.post(function (req,res) {
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
    
    Book.findOne({isbn: req.body.isbn},function (err,foundBook) {
        if(foundBook){
            res.send("Book with this ISBN already present");
        } else if(err){
            res.send(err);
        }
        else{
            newBook.save(function (er) {
                if(er){
                    res.send(er);
                } else{
                    res.send("Successfully saved!");
                }
            });
        }
    });
    
})
.delete(function (req,res) {
    Book.deleteMany(function (err) {
        if(err){
            res.send(err);
        } else{
            res.send("Successfully deleted all Books");
        }
    })
});

//ROUTES FOR A SPECIFIC BOOK
app.route("/book/:isbn")
.get(function (req,res) {
    Book.findOne({isbn: req.params.isbn},function (err,foundBook) {
        if(foundBook){
            res.send(foundBook);
        } else{
            res.send("No Book found!");
        }
    });
})
.put(function (req,res) {
    Book.findOneAndUpdate(
        {isbn: req.params.isbn}, {rating: req.body.rating, quantity: req.body.quantity}, function (err) {
            if(err){
                res.send(err);
            } else{
                res.send("Successfully updated!");
            }
        }
    );
})
.patch(function (req,res) {
    Book.updateOne(
        {isbn: req.params.isbn},
        {$set : req.body},
        function (err) {
            if(err){
                res.send(err);
            } else{
                res.send("Successfully updated!");
            }
        }
    );
})
.delete(function (req,res) {
    Book.findOne({isbn: req.params.isbn},function (err,foundBook) {
        if(foundBook){
            Book.remove({isbn: req.params.isbn}, function (er) {
                if(er)
                    res.send(er);
                else
                    res.send("Successfully deleted")
            })
        } 
        else{
            res.send("Book not found!");
        }
    })
});

const userSchema =new mongoose.Schema({
    name: String,
    email: {type: String, required: true},
    phone: [Number],
    age: Number,
    address: {
        flatNo: String,
        area: String,
        addressline1: String,
        addressline2: String,
        landmark: String,
        addressType: String,
        pincode: Number,
        district: String,
        state: String
    },
    isAdmin: {type: Boolean, required: true, default: false},
    wishlist: [String],
    orders: [String]
})

const User= mongoose.model("User",userSchema);

//ROUTES FOR ALL Users 
app.route("/users")
.get(function (req,res) {
    User.find(function (err,foundUsers) {
        if(err){
            res.send(err);
        } else{
            res.send(foundUsers);
        }
    })
})
.post(function (req,res) {
    const newUser = new User({
        name: req.body.name,
        email:req.body.email,
        phone: req.body.phone,
        age: req.body.age
    });
    
    User.findOne({email: req.body.email},function (err,foundUser) {
        if(foundUser){
            res.send("User with this email already present");
        } else if(err){
            res.send(err);
        }
        else{
            newUser.save(function (er) {
                if(er){
                    res.send(er);
                } else{
                    res.send("Successfully saved!");
                }
            });
        }
    });
    
})
.delete(function (req,res) {
    User.deleteMany(function (err) {
        if(err){
            res.send(err);
        } else{
            res.send("Successfully deleted all Users!");
        }
    })
});

//ROUTES FOR A SPECIFIC User
app.route("/user/:email")
.get(function (req,res) {
    User.findOne({email: req.params.email},function (err,foundUser) {
        if(foundUser){
            res.send(foundUser);
        } else{
            res.send("No User found!");
        }
    });
})
.put(function (req,res) {
    User.findOneAndUpdate(
        {email: req.params.email}, {name: req.body.name}, function (err) {
            if(err){
                res.send(err);
            } else{
                res.send("Successfully updated!");
            }
        }
    );
})
.patch(function (req,res) {
    User.updateOne(
        {email: req.params.email},
        {$set : req.body},
        function (err) {
            if(err){
                res.send(err);
            } else{
                res.send("Successfully updated!");
            }
        }
    );
})
.delete(function (req,res) {
    User.findOne({email: req.params.email},function (err,foundUser) {
        if(foundUser){
            User.remove({email: req.params.email}, function (er) {
                if(er)
                    res.send(er);
                else
                    res.send("Successfully deleted")
            })
        } 
        else{
            res.send("User not found!");
        }
    })
});

//ROUTES FOR ALL Admins 
app.route("/admins")
.get(function (req,res) {
    User.find({isAdmin: true},function (err,foundUsers) {
        if(err){
            res.send(err);
        } else{
            res.send(foundUsers);
        }
    })
})
.post(function (req,res) {
    const newUser = new User({
        name: req.body.name,
        email:req.body.email,
        phone: req.body.phone,
        age: req.body.age,
        isAdmin: true
    });
    
    User.findOne({email: req.body.email},function (err,foundUser) {
        if(foundUser){
            res.send("User with this email already present");
        } else if(err){
            res.send(err);
        }
        else{
            newUser.save(function (er) {
                if(er){
                    res.send(er);
                } else{
                    res.send("Successfully saved!");
                }
            });
        }
    });
    
})
.delete(function (req,res) {
    User.deleteMany({isAdmin: true},function (err) {
        if(err){
            res.send(err);
        } else{
            res.send("Successfully deleted all Admins!");
        }
    })
});

//ROUTES FOR A SPECIFIC Admin
app.route("/admin/:email")
.get(function (req,res) {
    User.findOne({email: req.params.email,isAdmin:true},function (err,foundUser) {
        if(foundUser){
            res.send(foundUser);
        } else{
            res.send("No User found!");
        }
    });
})
.put(function (req,res) {
    User.findOneAndUpdate(
        {email: req.params.email,isAdmin:true}, {name: req.body.name}, function (err) {
            if(err){
                res.send(err);
            } else{
                res.send("Successfully updated!");
            }
        }
    );
})
.patch(function (req,res) {
    User.updateOne(
        {email: req.params.email,isAdmin:true},
        {$set : req.body},
        function (err) {
            if(err){
                res.send(err);
            } else{
                res.send("Successfully updated!");
            }
        }
    );
})
.delete(function (req,res) {
    User.findOne({email: req.params.email,isAdmin:true},function (err,foundUser) {
        if(foundUser){
            User.remove({email: req.params.email}, function (er) {
                if(er)
                    res.send(er);
                else
                    res.send("Successfully deleted")
            })
        } 
        else{
            res.send("Admin not found!");
        }
    })
});


app.listen(process.env.PORT || 3000,function (req,res) {
    console.log("Server is running ....");
})