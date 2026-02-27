import PrescriptionRepository from "../repositories/PrescriptionRepository.js";
import AppointmentService from "./AppointmentService.js";
import PacientService from "./PacientService.js";
import DoctorService from "./DoctorService.js";
import PDFDocument from "pdfkit";
import fs from "fs";

const getAllPrescriptions = async () => {
  return await PrescriptionRepository.getAllPrescriptions();
};

const getPrescription = async (id) => {
  return await PrescriptionRepository.getPrescription(id);
};

const savePrescription = async ({
  date,
  appointmentId,
  medicine,
  dosage,
  instructions,
}) => {
  return await PrescriptionRepository.savePrescription({
    date,
    appointmentId,
    medicine,
    dosage,
    instructions,
  });
};

const updatePrescription = async (
  id,
  { date, appointmentId, medicine, dosage, instructions, file },
) => {
  return await PrescriptionRepository.updatePrescription(id, {
    date,
    appointmentId,
    medicine,
    dosage,
    instructions,
    file
  });
};

const deletePrescription = async (id) => {
  return await PrescriptionRepository.deletePrescription(id);
};

//gera pdf com a receita médica
const generatePrescriptionFile = async (prescription) => {
  const appointment = await AppointmentService.getAppointment(prescription.appointmentId);
  const pacient = await PacientService.getPacient(appointment.pacientId);
  const doctor = await DoctorService.getDoctor(appointment.doctorId);

  const id = prescription._id;
  const document = new PDFDocument({ font: 'Courier' });
  const filePath = "./MediApp/prescriptions" + id + ".pdf";

  document.pipe(fs.createWriteStream(filePath));
  document.fontSize(16).text('Paciente: ' + pacient.name);
  document.fontSize(16).text('Doutor: ' + doctor.name);

  const recipe = "Remédio: " + prescription.medicine;
  document.fontSize(12).text(recipe);

  document.fontSize(12).text('Dose: ' + prescription.dosage);
  document.fontSize(16).text('Instruções: ' + prescription.instructions);
  document.end();

  return prescription;
};

const prescriptionService = {
  getAllPrescriptions,
  getPrescription,
  savePrescription,
  updatePrescription,
  deletePrescription,
  generatePrescriptionFile,
};

export default prescriptionService;
