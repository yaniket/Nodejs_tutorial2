const cron = require("node-cron");
const express = require("express");
const nodeMailer = require("nodemailer");

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const task = cron.schedule('* * * * *', () => {
    console.log('running a task every minute');
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})