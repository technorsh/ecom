require("dotenv").config()
const mongoose =require("mongoose")

mongoose.connect(process.env.URL , { useNewUrlParser: true,  useUnifiedTopology:true});

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
    category: {
        type: [String], default: []
    },
    quantity: {
        type: Number,
        default: 0
    },
    },
    {timestamps: true}
)

bookSchema.index({title: 'text'});

const Book= mongoose.model("Book",bookSchema);

module.exports = Book;
