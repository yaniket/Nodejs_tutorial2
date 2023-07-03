//To fetch arrays id
const express = require('express')
const app = express()
const port = 3000
app.use(express.json());

const courses = [
    { id:1, course: "course1"},
    { id:2, course: "course2"},
    { id:3, course: "course1"}
]
app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.post('/api/courses/', (req, res) => {
    const course = {
        id: courses.length+1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course);
  });



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})