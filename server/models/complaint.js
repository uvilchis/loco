const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  }
}, { timestamps: true });

ComplaintSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 }) // To test

mongoose.model('Complaint', ComplaintSchema);