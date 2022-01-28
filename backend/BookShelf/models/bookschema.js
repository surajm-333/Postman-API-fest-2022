const mongoose = require('mongoose')

const bookSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true

    },
    genre:{
        type:String,
        required:true

    },
    // genreid:{
    //    type:Number,
    //    required:true
    // },
    author:{
         type:String,
         required:true
    },
    thumbnail:{
        type:String,
        required:true,
    },
    downloadURL:{
        type:String,
        required:true,
        unique:true
    }

},{timestamps:true})
bookSchema.path('downloadURL').validate((val) => {
    urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
    return urlRegex.test(val);
}, 'Invalid URL.');
bookSchema.path('thumbnail').validate((val) => {
    urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
    return urlRegex.test(val);
}, 'Invalid URL.');
const Book = mongoose.model('BooksShelf',bookSchema)
module.exports = {Book}