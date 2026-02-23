import AppointmentRepository from "../repositories/AppointmentRepository";

const getAllAppointments = async () => {
    return AppointmentRepository.getAllAppointments();
}

const getAppointment = async (id) => {
    return AppointmentRepository.getAppointment();
}

const saveAppointment = async ({ date, doctorId, pacientId }) => {
    return AppointmentRepository.saveAppointment({ date, doctorId, pacientId });
}

const updateAppointment = async ({ date, doctorId, pacientId }) => {
    return AppointmentRepository.updateAppointment({ date, doctorId, pacientId });
}

const deleteAppointment = async (id) => {
    return AppointmentRepository.deleteAppointment(id);
}

const appointmentService = {
    getAllAppointments,
    getAppointment,
    saveAppointment,
    updateAppointment,
    deleteAppointment
}

export default appointmentService;