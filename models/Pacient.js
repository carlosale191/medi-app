import { mongoose } from 'mongoose';

const Schema = mongoose.Schema;

const pacientSchema = new Schema({

    name: {
        type: String,
        required: [true, 'Nome do paciente é necessário.']
    },
    birthDate: {
        type: Date,
        default: null
    },
    email: {
        type: String,
        required: [true, 'Email necessário.'],
    },
    phone: {
        type: String,
        required: [true, 'Telefone necessário.']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const paciente = mongoose.model('Pacient', pacientSchema);

export default paciente;