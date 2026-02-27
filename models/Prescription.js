import { mongoose } from "mongoose";

const Schema = mongoose.Schema;

const prescriptionSchema = new Schema({
  date: {
    type: Date
  },
  appointmentId: {
    type: String,
    required: [true, "ID de consulta necessário."],
  },
  medicine: {
    type: String,
    required: [true, "Remédio necessário."],
  },
  dosage: {
    type: String,
    required: [true, "Dosagem necessária."],
  },
  instructions: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  file: {
    type: String
  }
});

const prescription = mongoose.model("Prescription", prescriptionSchema);

export default prescription;
