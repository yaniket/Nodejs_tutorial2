const express = require('express')
const mongoose = require("mongoose")
const app = express()
const port = 3000

// mongoose connection
mongoose.connect("mongodb://127.0.0.1:27017/new33playground")
.then(()=> console.log("Connected to mongo"))
.catch((err)=> console.log("failed to connect",err))

app.get('/', (req, res) => {
  res.send('Hello Ethereum')
})



// Designing the schema
const courseSchema = new mongoose.Schema({
    book: String, 
    author:String,
    tags:[String],
    date: {type: Date, default: Date.now},
})

const Course = new mongoose.model("courses", courseSchema);

//Creating the document
// async function createCourse(){
//   const course = new Course({
//     book:"Pepe the currency",
//     author:"siddesh",
//     tags:['elon musk', 'warren']
//   })

//   course.save();
// }

// createCourse();

// getting the courses
// async function getCourse(){
//     const result = await Course.find({author:"/^aniket/"});
//     console.log(result);
// }

// getCourse();

// Updating the course
// async function updateCourse(id){
//   const result = await Course.findById(id);
//   result.author = "bitcoin2023";
//   console.log("updated course", result);
// }

// updateCourse('649abe1d759126b5f035caaa');

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})