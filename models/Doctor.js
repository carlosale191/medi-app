import { mongoose } from "mongoose";

const Schema = mongoose.Schema;

const doctorSchema = new Schema({
  name: {
    type: String,
    required: [true, "Nome do doutor é necessário."],
  },
  login: {
    type: String,
    required: [true, "Login é necessário."],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Senha é necessária."],
  },
  medicalSpecialty: {
    type: String,
    required: [true, "Especialidade é necessária."],
  },
  medicalRegistration: {
    type: String,
    required: [true, "Registro médico necessário."],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email necessário."],
    unique: true,
  },
  phone: {
    type: String,
    required: [true, "Telefone necessário."],
    validate: {
      validator: function (v) {
        return /\d{2} 9\d{4}-\d{4}/.test(v);
      },
      message: props => `${props.value} Telefone inválido. Use um número no formato 99-91234-9999`
    }
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const doctor = mongoose.model("Doctor", doctorSchema);

export default doctor;
