const express = require('express')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const app = express();
const config = require('./config/config').get(process.env.NODE_ENV);
mongoose.Promise = global.Promise;
const {Book} =require('./models/bookschema')    //Fetch Book Schema
const {getUserById, isAdmin} = require("./controllers/auth")
mongoose.connect(config.DATABASE).then(() => {
    console.log("MONGODB CONNECTED")
}).catch(err => "DATABASE CONNECTION FAILED")
app.use(express.json());      // MiddleWares
app.use(cookieParser());      // MiddleWares

const authRoutes = require("./routes/authRoutes");
const { signedIn, isAuthenticated } = require('./controllers/auth');


app.use("/api", authRoutes);

app.param("userId", getUserById)


// --- GET ---

app.get("/", (req, res) => {
    res.send("Hello World")
})
app.get('/api/getbook',signedIn,(req,res)=>{
    let id = req.query.id;
    Book.findById(id,(err,doc)=>{
        if(err) return res.status(400).send(err)
        res.send(doc)

    })
})
app.get('/api/books', signedIn ,(req,res)=>{
    Book.find({},(err,docs)=>
    { 
        console.log(err)
        if(err) return res.status(400)
        res.send(docs)
    })
})
app.get('/api/bookbysearch',signedIn,(req,res)=>{
    let search = req.query.search;
    Book.find({$or:[{name:{$regex:search}},{author:{$regex:search}},{genre:{$regex:search}}]},(err,bookdet)=>{
        if(err) return res.status(400).send(err)
        res.json(bookdet)
    })
})
// --- POST---
app.post('/api/admin/book/:userId',signedIn, isAuthenticated, isAdmin,(req,res)=>{
    const bookdet = new  Book(req.body);
    bookdet.save((err,doc)=>{
        if(err) return res.status(400).send(err)
        res.status(200).json({
            post:true
        })
    })
})
// ---UPDATE---
app.post('/api/admin/update/:userId',signedIn, isAuthenticated, isAdmin,(req,res)=>{
    const id = req.body._id;
    Book.findByIdAndUpdate(id,req.body,{new:true},(err,doc)=>{
        if(err) return res.status(400).send(err)
        res.status(200).json({
            success:true
        })
    })
})
// ---DELETE---
app.delete('/api/admin/delete/:userId',signedIn, isAuthenticated, isAdmin,(req,res)=>{
  const id = req.query.id;
  Book.findByIdAndRemove(id,(err,doc)=>{
      if(err) return res.status(400).send(err)
      res.json({success:true})
  })
})

const PORT = process.env.PORT || 3000;

app.listen(PORT,(err)=>{
    if(err) console.log("Error")
    else console.log("Running on Port 3000")
})