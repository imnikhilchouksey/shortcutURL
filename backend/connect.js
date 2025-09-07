const mongoose = require('mongoose')

async function connectToMongoDB(url){
  try{
    await mongoose.connect(url)
    console.log("MongoDB is connected successfully")
  } catch(error) {
    console.error("Failed to connect MongoDB",error)
  }
}

module.exports = {connectToMongoDB}