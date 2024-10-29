import mongoose from "mongoose";

const peopleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  barangay: {
    type: String,
  },
  number: {
    type: Number,
    default: null,
  },
  role: {
    type: String,
    default: null,
  },
  precint: {
    type: String,
  },
  barangay_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Barangay',
    default: null,
  },
});

export const People = mongoose.model('People', peopleSchema, 'people');
