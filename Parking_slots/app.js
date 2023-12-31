// index.js
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/parking-lot', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define the ParkingLot schema
const parkingLotSchema = new mongoose.Schema({
  number: Number,
  reserved: Boolean,
  occupied: Boolean,
  user: String,
  bookedAt: Date,
});
const ParkingLot = mongoose.model('ParkingLot', parkingLotSchema);

// API to get all available parking slots
app.get('/api/parking-lot/available', async (req, res) => {
  try {
    const availableSlots = await ParkingLot.find({
      reserved: false,
      occupied: false,
    });
    res.json(availableSlots);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// API to get all occupied parking slots
app.get('/api/parking-lot/occupied', async (req, res) => {
  try {
    const occupiedSlots = await ParkingLot.find({ occupied: true });
    res.json(occupiedSlots);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// API to get total registered users
app.get('/api/users/total', async (req, res) => {
  try {
    const totalUsers = await ParkingLot.distinct('user').countDocuments();
    res.json({ totalUsers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Helper function to find an available parking slot
const findAvailableSlot = async () => {
  const availableSlot = await ParkingLot.findOne({
    reserved: false,
    occupied: false,
  }).sort({ number: 1 });
  return availableSlot;
};

// Helper function to book a parking slot
const bookParkingSlot = async (number, user) => {
  const parkingSlot = await ParkingLot.findOne({ number });
  parkingSlot.reserved = true;
  parkingSlot.occupied = true;
  parkingSlot.user = user;
  parkingSlot.bookedAt = new Date();
  await parkingSlot.save();
};

// Helper function to release a parking slot
const releaseParkingSlot = async (number) => {
  const parkingSlot = await ParkingLot.findOne({ number });
  parkingSlot.reserved = false;
  parkingSlot.occupied = false;
  parkingSlot.user = '';
  parkingSlot.bookedAt = null;
  await parkingSlot.save();
};

// Timer to check and release parking slots if not occupied in time
setInterval(async () => {
  const occupiedSlots = await ParkingLot.find({ occupied: true });
  const currentTime = new Date();
  for (const slot of occupiedSlots) {
    const timeElapsed = (currentTime - slot.bookedAt) / (1000 * 60);
    if (timeElapsed > 30) {
      await releaseParkingSlot(slot.number);
    }
  }
}, 60000); // Run every minute

// API to book a parking slot
app.post('api/parking-lot/book', async (req, res) => {
  try {
    const { ParkingLot } = req.body;
    const currentTime = new Date();
    const availableSlot = await findAvailableSlot();

    if (availableSlot) {
      // Check if more than 50% capacity is utilized
      const totalSlots = await ParkingLot.countDocuments();
      const occupiedSlots = await ParkingLot.countDocuments({ occupied: true });
      const utilizationPercentage = (occupiedSlots / totalSlots) * 100;

      if (utilizationPercentage >= 50) {
        // No extra wait time
        await bookParkingSlot(availableSlot.number, user);
      } else {
        // Extra 15 mins wait time
        const fifteenMinsLater = new Date(currentTime.getTime() + 15 * 60000);
        if (availableSlot.reserved) {
          // Reserved parking spot clash, give priority to reserved user
          await bookParkingSlot(availableSlot.number, user);
        } else if (currentTime >= fifteenMinsLater) {
          await bookParkingSlot(availableSlot.number, user);
        } else {
          res.status(400).json({ error: 'Parking slot not available' });
          return;
        }
      }

      res.send({ message: 'Parking slot booked successfully' });
    } else {
      res.status(400).json({ error: 'Parking slot not available' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
