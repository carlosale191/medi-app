import { mongoose } from 'mongoose';

const Schema = mongoose.Schema;

const appointmentSchema = new Schema({

    date: {
        type: Date,
        required: [true, 'É necessário incluir a data.']
    },
    doctorId: {
        type: String,
        required: [true, 'ID do doutor é necessária.']
    },
    pacientId: {
        type: String,
        required: [true, "ID do paciente é necessária."]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}
);

//vincula com entidade no db
const appointment = mongoose.model('Appointment', appointmentSchema);

export default appointment;