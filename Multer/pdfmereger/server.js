const express = require('express')
const path = require('path')
const app = express()
const multer  = require('multer')
const {mergePdfs}  = require('./merge')

const upload = multer({ dest: 'uploads/' })
app.use('/media', express.static(path.join(__dirname, "/media")));
app.use('/static', express.static('public') )
const port = 3000

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"))
})

 

app.post('/merge', upload.array('pdfs', 3), async (req, res, next)=> {
  console.log(req.files)
  await mergePdfs(path.join(__dirname, req.files[0].path), path.join(__dirname, req.files[1].path))
  // console.log("d", d);
  console.log("danger Zone");
  res.redirect(`http://localhost:3000/static/merged.pdf` )
  // res.send({data: req.files})
  // req.files is array of `photos` files
  // req.body will contain the text fields, if there were any
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})