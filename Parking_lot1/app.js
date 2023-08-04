// index.js

const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Define the ParkingLot schema
// const parkingLotSchema = new mongoose.Schema({
//     number: Number,
//     reserved: Boolean,
//     occupied: Boolean,
//     user: String,
//     Time: Date
//   });

//   const userSchema = new mongoose.Schema({
//     category: String,

//   });

// const user = mongoose.model("User",userSchema);
  
// const ParkingLot = mongoose.model('ParkingLot', parkingLotSchema);


const data=[]

const schema={
    number: null,
    reserved: null,
    occupied: null,
    user: null,
    Time: null
}
// API to get all registered users
app.get('/getData', async (req, res) => {
  res.send({Collection:data})
});

let number = 0;
let timeGeneral = 0;

// General category api
app.post('/creategeneral', async (req, res) => {
    let count = 0;
    const bodyData=req.body
    const currentTime = new Date();
    timeGeneral = currentTime.getHours()+ ":" +currentTime.getMinutes()+ ":" +currentTime.getSeconds();
    bodyData.Time = timeGeneral;
    bodyData.category = "general";
    number+=1;

    
    
    bodyData.number = number;
    
    if(data.length >= 20){
      return res.send("slot is full");
    }
    if(data.length > 0 && data[0].category == "reserved"){
      console.log("fetched user");
}

     // Counting reserved category
     for(let i = 0; i < data.length; i++){
      if(data.length >0 && data[i].category == "reserved"){
        count+=1;
      }
}
    //reserved space is occupied completely
    if(count >= 10){
      bodyData.category = "general";
    }
    else{
      data.push(bodyData);
    }
    
    res.send({Collection:req.body})
  });

  let timeReserved = 0;

// Reserved category api
app.post('/createreserved', async (req, res) => {
    let count = 0;
    const bodyData=req.body
    const currentTime = new Date();
    timeReserved = currentTime.getHours()+ ":" +currentTime.getMinutes()+ ":" +currentTime.getSeconds();
    bodyData.Time = timeReserved;
    bodyData.category = "reserved";
    number+=1;
    bodyData.number = number;

    
    // Base condition
    if(data.length >= 20){
      return res.send("slot is full");
    }


     // Priority decision
     if(timeReserved < timeGeneral){
      console.log("hello world");

       schema.number= bodyData.number,
       schema.reserved= bodyData.reserved,
       schema.occupied= bodyData.occupied,
       schema.user= bodyData.user,
       schema.Time= bodyData.Time

      data.push(bodyData);
      return res.send("reserved user is alloted");
    }
    
      

       if(data.length > 0 && data[0].category == "reserved"){
      console.log("fetched user");
}

    

     // Counting reserved category
     for(let i = 0; i < data.length; i++){
      if(data.length >0 && data[i].category == "reserved"){
     
        count+=1;
      }
}


    //reserved space is occupied completely
    if(count >= 10){
      bodyData.category = "general";
      data.push(bodyData);
    }
    else{
      data.push(bodyData);
    }
    res.send({Collection:req.body})

   
  });
  


  // If 50% of the capacity is occupied
  if(data.length > 30){
    setTimeout(()=>{
      for(let i = 0; i < data.length; i++){
        data.splice(0, i);
      }
    }, 120000)
  }
    setTimeout(()=>{
      for(let i = 0; i < data.length; i++){
        data.splice(0, i);
      }
    }, 60000)

   


app.delete('/delete', async (req, res) => {    
  for(let i = 0; i < data.length; i++){
          if(data[0].number == 1){
            data.splice(0,1);
            return res.send("Data deleted successfully");
          }
  }

    
});

// API to get all occupied parking slots occupied

app.get('/parking-lot/occupied', async (req, res) => {
  try {
    const occupiedarray = []

    const occupiedSlots = await data.filter(element => element.occupied = true);
    occupiedarray.push(occupiedSlots);
    res.json({OccupiedSlots: occupiedSlots});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error:error.message });
  }
});

// API to get all available parking slots
app.get('/parking-lot/available', async (req, res) => {
  
    if((20 - data.length) > 0 || data.length == 0)
      res.json(`${20 - data.length} slots available`);
    else{
      res.json("slots are full");
    }
});


// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
