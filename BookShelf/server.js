const express = require('express')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const app = express();
const config = require('./config/config').get(process.env.NODE_ENV);
mongoose.Promise = global.Promise;
const {Book} =require('./bookschema')    //Fetch Book Schema
mongoose.connect(config.DATABASE) 
app.use(express.json());      // MiddleWares
app.use(cookieParser());      // MiddleWares

// --- GET ---
app.get('/api/getbook',(req,res)=>{
    let id = req.query.id;
    Book.findById(id,(err,doc)=>{
        if(err) return res.status(400).send(err)
        res.send(doc)

    })
})
app.get('/api/books',(req,res)=>{
    Book.find({},(err,docs)=>
    { 
        console.log(err)
        if(err) return res.status(400)
        res.send(docs)
    })
})
app.get('/api/bookbyname',(req,res)=>{
    let bookname = req.query.name;
    Book.find({name:bookname},(err,bookdet)=>{
        if(err) return res.status(400).send(err)
        res.json(bookdet)
    })
})
app.get('/api/bookbyauthor',(req,res)=>{
   let bookauthor = req.query.author;
   Book.find({author:bookauthor},(err,bookdet)=>{
       if(err) return res.status(400).send(err)
       res.json(bookdet)
   })
})
app.get('/api/bookbygenre',(req,res)=>{
    let bookgenre = req.query.genre;
    Book.find({genre:bookgenre},(err,bookdet)=>{
        if(err) return res.status(400).send(err)
        res.send(bookdet)
    })
})
// --- POST---
app.post('/api/admin/book',(req,res)=>{
    const bookdet = new  Book(req.body);
    bookdet.save((err,doc)=>{
        if(err) return res.status(400).send(err)
        res.status(200).json({
            post:true
        })
    })
})
// ---UPDATE---
app.post('/api/admin/update',(req,res)=>{
    const id = req.body._id;
    Book.findByIdAndUpdate(id,req.body,{new:true},(err,doc)=>{
        if(err) return res.status(400).send(err)
        res.status(200).json({
            success:true
        })
    })
})
// ---DELETE---
app.delete('/api/admin/delete',(req,res)=>{
  const id = req.query.id;
  Book.findByIdAndRemove(id,(err,doc)=>{
      if(err) return res.status(400).send(err)
      res.json({success:true})
  })
})
app.listen(3000,(err)=>{
    if(err) console.log("Error")
    else console.log("Running on Port 3000")
})