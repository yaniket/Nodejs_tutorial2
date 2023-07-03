
// const express = require("express");
// const app = express();

// // An example middleware function
// const a_middleware_function = function (req, res, next) {
//   // Perform some operations
//   next(); // Call next() so Express will call the next middleware function in the chain.
// };

// // Function added with use() for all routes and verbs
// app.use(a_middleware_function);

// // Function added with use() for a specific route
// app.use("/someroute", a_middleware_function);

// // A middleware function added for a specific HTTP verb and route
// app.get("/", a_middleware_function);

// app.listen(3000);

//Serving static files 

const express = require('express')
const app = express()
const port = 3000
const path = require("path")

const public = path.join(__dirname, "../public/")

//built in middleware
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.send('Hello World!')
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})




