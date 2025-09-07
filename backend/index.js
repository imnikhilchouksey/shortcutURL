const express = require('express') ; 
const {connectToMongoDB} = require('./connect');
const urlRoute = require('./routes/url');
const URL = require('./models/url'); 
const cors = require("cors");
require('dotenv').config(); 


const app = express(); 
const PORT = process.env.PORT || 5000; 


connectToMongoDB(process.env.MONGODB_URL)
.then(()=>{
  console.log("MongoDB connected"); 
})
.catch((error)=>{
  console.log("Failed to connect MongoDB", error); 
  process.exit(1); 
})

app.use(express.json()); 

app.use(cors({ origin: [process.env.FRONTEND_URL, "http://localhost:5173"] }));

app.use(express.urlencoded({ extended: true }));

app.use('/url', urlRoute); 

app.get('/:shortId',async (req,res)=>{
  const shortId = req.params.shortId ; 
  
  try{
    const entry = await URL.findOneAndUpdate(
      {shortId},
      {$push:{visitHistory:{timestamp:Date.now()}}}
    ) ; 

    if (!entry){
      return res.status(404).json({error:"Short url not found"})
    }

    return res.redirect(entry.redirectURL); 
  } catch(error){
    console.error("Failed to retreive short url : ", error); 
    return res.status(500).json({error:"Failed to retreive short url"})
  }
})

app.listen(PORT,()=>{
  console.log(`Server is listening on PORT ${PORT}`); 
})

