// //To display arrays 
// const express = require('express')
// const app = express()
// const port = 3000

// const courses = [
//     { id:1, course: "course1"},
//     { id:2, course: "course2"},
//     { id:3, course: "course1"}
// ]
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.get('/api/courses', (req, res)=> {
//    res.send(courses);
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

//To fetch arrays id
const Joi = require('joi');
const express = require('express')
const app = express()
const port = 3000
app.use(express.json());

const courses = [
    { id:1, course: "course1"},
    { id:2, course: "course2"},
    { id:3, course: "course1"}
]
app.get('/api/courses', (req, res) => {
  res.send(courses);
})


app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if(!course) res.status(404).send("id was not found")
   res.send(course);
});

app.post('/api/courses/', (req, res) =>{

  const schema = {
    name: Joi.string().min(3).required()
  };

  const result = schema.Validate({name: "course3"});
  console.log(result)
  const course = {
    id : courses.length+1,
    course : req.body.course
  };
  courses.push(course);
  res.send(course);
})

app.delete('/api/courses/:id', (req, res)=>{
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if(!course) res.status(404).send("id was not found")
   res.send(course);

   //Delete the course
   const index = courses.indexOf(course);
   courses.splice(index, 1);

   res.send(course);
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})