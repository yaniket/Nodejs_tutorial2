const express = require("express");
const cors = require("cors");
const port = 3000

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

app.post("/authenticate", async (req, res) => {
  const { username } = req.body;
  try{
        const r = await axios.put(
            'https://api.chatengine.io/users/',
            {username: username, secret:username, first_name: username},
            {headers: {"private-key": "9b854b90-bf52-4f23-924e-aec094025c6d"}}
        )
        return res.status(r.status).json(r.data)
  }
  catch(e){
    return  res.status(500).json({ error: 'Server error' });
  }
});

app.get("/", async (req ,res) =>{
     res.send("hello Shiba");
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })