const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema({
  sub: {
    type: String
  },

  stopId: {
    type: String,
  },

  routeId: {
    type: String
  },

  createdAt: {
    type: Date,
    expires: 60
  }

}, { timestamps: true });

// ComplaintSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 }) // To test

mongoose.model('Complaint', ComplaintSchema);