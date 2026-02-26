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
        required: [true, 'Telefone necessário.'],
        validate: {
          validator: function (v) {
            return /\d{2} 9\d{4}-\d{4}/.test(v);
          },
          message:props => `${props.value} Telefone inválido. Use um número no formato 99-91234-9999`
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const paciente = mongoose.model('Pacient', pacientSchema);

export default paciente;
