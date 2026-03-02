import express from 'express';
import appointmentController from "./AppointmentController.js";
import doctorController from "./DoctorController.js";
import pacientController from "./PacientController.js";
import prescriptionController from './PrescriptionController.js';
import doctorService from '../services/DoctorService.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import verifyToken from '../middleware/authMiddleware.js';

let router = express.Router();

router.get(
    "/", function (req, res) {
        console.log("hi");
        res.status(200).json({ message: "hi!" });

    }
);

//mapeamento do login
router.post('/login', async (req, res) => {
    try {
        const { login, password } = req.body;
        const doctor = await doctorService.getDoctorByLogin(login);
        if (!doctor) {
            return res.status(401).json({ error: 'Autenticação falhou!' });
        }

        const passwordMatch = bcrypt.compare(password, doctor.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Autenticação falhou!' });
        }

        const token = jwt.sign({ doctorId: doctor._id }, 'you-secret-key', {
            expiresIn: '1h'
        });

        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Login falhou' })
    }
});

//home da aplicação fazendo mapeamento
//todas rotas mapeadas precisam de um token válido
router.use("/", verifyToken, appointmentController);
router.use("/", verifyToken, doctorController);
router.use("/", verifyToken, pacientController);
router.use("/", verifyToken, prescriptionController);

export default router;