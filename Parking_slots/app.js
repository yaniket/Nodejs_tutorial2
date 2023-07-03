const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Create the Express app
const app = express();

// Set up body-parser middleware
app.use(bodyParser.json());

var myDateString = Date();
console.log(myDateString, "date");
// Connect to MongoDB
mongoose
  .connect('mongodb://127.0.0.1:27017/parking_system', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Create a schema for the parking slots
let course = 0;
const parkingSlotSchema = new mongoose.Schema({

  number: { type: Number, unique: true},
  status: { type: String, enum: ['available', 'occupied'], default: 'available' },
  date: {type:Date}

}
)
//   reserved: { type: Boolean, default: false },}
//   reservedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
// );

console.log(parkingSlotSchema.length);




// Create a schema for the users
const userSchema = new mongoose.Schema({
  name: String,
});

// Create the models for parking slots and users
const ParkingSlot = mongoose.model('ParkingSlot', parkingSlotSchema);
const User = mongoose.model('User', userSchema);

//Adding the user
async function createUser(){
  const user = new User({
    name: "Abhinav"
  })  
  
  user.save();
  let userId = await User.findById();
  console.log(userId);
}

createUser();



// /Creating the document
async function createParking(){
    const parking = new ParkingSlot({
      number :17, 
      status: "occupied", 
      date: new Date() 
    })
    
    parking.save();

    let parkingLength = await ParkingSlot.find().exec();
    if(parkingLength.length > 10)
    console.log("50% slots reserved");
}

createParking();

// API endpoint: Get all available parking slots
app.get('/api/parking-slots/available', async (req, res) => {
  try {
    const slots = await ParkingSlot.find({ status: 'available' }).exec();
    res.json(slots);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API endpoint: Get all occupied parking slots
app.get('/api/parking-slots/occupied', async (req, res) => {
  try {
    const slots = await ParkingSlot.find({ status: 'occupied' }).exec();
    res.json(slots);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API endpoint: Total registered users
app.get('/api/users/total-registered', async (req, res) => {
  try {
    const count = await User.countDocuments().exec();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/courses/', (req, res) =>{

    const course = {
      id : courses.length+1,
      course : req.body.course
    };
    courses.push(course);
    res.send(course);
  })

// bookig the Parking slot

  async function checkingSlots(){
        // Check if there are any available parking slots
      const availableSlot = await ParkingSlot.findOne({ status: 'available' }).exec();
      console.log(availableSlot);
      if (!availableSlot) {
        console.log("Slots are not available");
        return;
      }

      // Reserve the parking slot
    availableSlot.status = 'occupied';
    const userId = 
    await availableSlot.save();
  }

checkingSlots();
     
  

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
                                                        



































































