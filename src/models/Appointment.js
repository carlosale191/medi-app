import { mongoose } from "mongoose";
import Pacient from "./Pacient.js";
import Doctor from "./Doctor.js";

const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  date: {
    type: Date,
    required: [true, "É necessário incluir a data."],
  },
  doctorId: {
    type: String,
    required: [true, "ID do doutor é necessária."],
    validate: {
      validator: function (v) {
        const id = new mongoose.Types.ObjectId(v); // convertendo uma string em objeto ID para ser encontrado no banco
        return Doctor.exists({ _id: id });
      },
      message: (props) => `DoctorID ${props.value} não encontrado.`,
    },
  },
  pacientId: {
    type: String,
    required: [true, "ID do paciente é necessária."],
    validate: {
      validator: function (v) {
        const id = new mongoose.Types.ObjectId(v);
        return Pacient.exists({ _id: id });
      },
      message: (props) => `PacientID ${props.value} não encontrado.`,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//vincula com entidade no db
const appointment = mongoose.model("Appointment", appointmentSchema);

export default appointment;
