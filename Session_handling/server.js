const cookieParser = require('cookie-parser')
const express = require('express')
const session = require('express-session')
const app = express()
const port = 3000
const express_session = require("express-session")

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(cookieParser());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: "secret"
}))

const user = {
   name: "aniket",
   age: 18,
   occupation: "software developer"

}

app.get('/login', (req, res) =>{
    req.session.user = user;
    req.session.save();
    return res.send("user logged in")
})

app.get("/user", (req, res) => {
  const sessionUser = req.session.user;
  return res.send(sessionUser);
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  return res.send("User logged out!");
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})