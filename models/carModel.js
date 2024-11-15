const mongoose = require('mongoose');

const carSchema = new mongoose.Schema(
  {
    name: {  
      type: String,
      required: true,
    },
    description: { 
        type: String,
      },
    model: { 
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    mileage: {  
      type: String,
      required: true,
    },
    fuelType: { 
      type: String,
      required: true,
    },
    engine: {  
      type: String,
      required: true,
    },
    color: { 
      type: String,
      required: true,
    },
    transmission: {  
      type: String,
      required: true,
    },
    condition: {  
      type: String,
      required: true,
    },
    location: {  
      type: String,
      required: true,
    },
    tags: [{  
      type: String,
    }],
    images: [{  
      type: String,
    }],
    carType: {  
      type: String,
      required: true,
    },
    company: {  
      type: String,
      required: true,
    },
    dealer: {  
      type: String,
      required: true,
    },
    userId: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,  
  }
);

// Create the Car model
const Car = mongoose.model('Car', carSchema);

module.exports = Car;
