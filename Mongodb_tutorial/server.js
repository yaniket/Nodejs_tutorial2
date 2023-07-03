const express = require('express')
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express()
const port = 3000
dotenv.config();


mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
  })
  .then(() => console.log("DB Connection Successfull"))
  .catch((err) => {
    console.error(err);
  });

const tourSchema = new mongoose.Schema(
    {
      username: { type: String, required: true, unique: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      profilePic: { type: String, defaut: "" },
      isAdmin: { type: Boolean, default: false },
    },
    { timestamps: true }
);

const Tour = mongoose.model("Tour", tourSchema);

// Creating the document, no postman needed
const testtour = new Tour({
  username: "sneha",
  email: "sneha@gmail.com",
  password:"123456"
})

testtour.save().then(doc =>{
console.log(doc);
}).catch(err =>{
  console.log("Error!! ", err);
}
)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

