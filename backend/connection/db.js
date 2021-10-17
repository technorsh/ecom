const mongoose =require("mongoose")

mongoose.connect("mongodb+srv://tawi:tawi123@cluster0.byvam.mongodb.net/ecomDB" , { useNewUrlParser: true,  useUnifiedTopology:true});

const userSchema =new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true
    },
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
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    wishlist: [String],
    orders: [String]
})

const User= mongoose.model("User",userSchema);

module.exports = User;
