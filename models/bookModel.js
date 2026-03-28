import mongoose from "mongoose";

const bookSchema=new mongoose.Schema({
    bookname:{
        type:String,
        required:true,
        trim:true
    },
    author:{
        type:String,
        required:true,
        trim:true
    },
    price:{
        type:Number,
        required:true,
        min:1
    },
    pages:{
        type:Number,
        required:true,
        min:1
    },
})

const bookModel=mongoose.model('books',bookSchema);
export default bookModel;
