const mongoose =require("mongoose")

mongoose.connect("mongodb+srv://tawi:tawi123@cluster0.byvam.mongodb.net/ecomDB" , { useNewUrlParser: true,  useUnifiedTopology:true});

const bookSchema =new mongoose.Schema({
    title: String,
    author: String,
    version: String,
    publication: String,
    isbn: {
        type: String,
        required: true
    },
    rating:  {
        type: Number,
        default: 1
    },
    category: [String],
    quantity: {
        type: Number,
        default: 0
    }
})

const Book= mongoose.model("Book",bookSchema);

module.exports = Book;
