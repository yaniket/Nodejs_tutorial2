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
    }, 1800000)
  }
    setTimeout(()=>{
      for(let i = 0; i < data.length; i++){
        data.splice(0, i);
      }
    }, 900000)

   


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

// // API to get total registered users
// app.get('/users/total', async (req, res) => {
//   try {
//     const totalUsers = await ParkingLot.distinct('user').countDocuments();
//     res.json({ totalUsers });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// // Helper function to find an available parking slot
// const findAvailableSlot = async () => {
//   const availableSlot = await ParkingLot.findOne({
//     reserved: false,
//     occupied: false,
//   }).sort({ number: 1 });
//   return availableSlot;
// };

// // Helper function to book a parking slot
// const bookParkingSlot = async (number, user) => {
//   const parkingSlot = await ParkingLot.findOne({ number });
//   parkingSlot.reserved = true;
//   parkingSlot.occupied = true;
//   parkingSlot.user = user;
//   parkingSlot.bookedAt = new Date();
//   await parkingSlot.save();
// };

// // Helper function to release a parking slot
// const releaseParkingSlot = async (number) => {
//   const parkingSlot = await ParkingLot.findOne({ number });
//   parkingSlot.reserved = false;
//   parkingSlot.occupied = false;
//   parkingSlot.user = '';
//   parkingSlot.bookedAt = null;
//   await parkingSlot.save();
// };

// // Timer to check and release parking slots if not occupied in time
// setInterval(async () => {
//   const occupiedSlots = await ParkingLot.find({ occupied: true });
//   const currentTime = new Date();
//   for (const slot of occupiedSlots) {
//     const timeElapsed = (currentTime - slot.bookedAt) / (1000 * 60);
//     if (timeElapsed > 30) {
//       await releaseParkingSlot(slot.number);
//     }
//   }
// }, 60000); // Run every minute

// // API to book a parking slot
// app.post('/parking-lot/book', async (req, res) => {
//   try {
//     const { user } = req.body;
//     const currentTime = new Date();
//     const availableSlot = await findAvailableSlot();

//     if (availableSlot) {
//       // Check if more than 50% capacity is utilized
//       const totalSlots = await ParkingLot.countDocuments();
//       const occupiedSlots = await ParkingLot.countDocuments({ occupied: true });
//       const utilizationPercentage = (occupiedSlots / totalSlots) * 100;

//       if (utilizationPercentage >= 50) {
//         // No extra wait time
//         await bookParkingSlot(availableSlot.number, user);
//       } else {
//         // Extra 15 mins wait time
//         const fifteenMinsLater = new Date(currentTime.getTime() + 15 * 60000);
//         if (availableSlot.reserved) {
//           // Reserved parking spot clash, give priority to reserved user
//           await bookParkingSlot(availableSlot.number, user);
//         } else if (currentTime >= fifteenMinsLater) {
//           await bookParkingSlot(availableSlot.number, user);
//         } else {
//           res.status(400).json({ error: 'Parking slot not available' });
//           return;
//         }
//       }

//       res.json({ message: 'Parking slot booked successfully' });
//     } else {
//       res.status(400).json({ error: 'Parking slot not available' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
