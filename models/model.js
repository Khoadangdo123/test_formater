import Mongoose from 'mongoose';

const { Schema } = Mongoose;

const dataSchema = new Schema({
  title: {
    required: true,
    type: String
  },
  name: {
    required: true,
    type: String
  },
  age: {
    required: true,
    type: Number
  }
});

export const Model = Mongoose.model('Data', dataSchema);
