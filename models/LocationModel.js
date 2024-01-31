const mongoose = require('mongoose');

const locationSchema = mongoose.Schema({
  latitude: {
    type: Number,
    required: [true, 'Add a value between -90 and 90'],
    min: -90,
    max: 90
  },
  longitude: {
    type: Number,
    required: [true, 'Add a value between -180 and 180'],
    min: -180,
    max: 180
  }
}, 
{
  timestamps: true
});

module.exports = mongoose.model('Location', locationSchema)