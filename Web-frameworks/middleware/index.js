
// const express = require('express');
// const app = express();

// // Middleware that throws an error
// app.use((req, res, next) => {
//   const err = new Error('Something went wrong');
//   err.status = 500;
//   next(err);
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   res.status(err.status || 500).json({
//     error: {
//       message: err.message
//     }
//   });
// });

// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });

// Insert a key value pair in req in middleware

const express = require('express');
const app = express();

// Middleware that adds a key value pair to req
app.use((req, res, next) => {
  req.customKey = '12';
  next();
});

app.get('/', (req, res) => {
  res.send(`Custom key value: ${req.customKey}`);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
