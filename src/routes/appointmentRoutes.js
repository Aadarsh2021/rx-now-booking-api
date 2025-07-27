const express = require('express');
const AppointmentController = require('../controllers/appointmentController');

const router = express.Router();

// POST /api/appointments - Book an appointment
router.post('/', AppointmentController.bookAppointment);

// GET /api/appointments - Get appointments with filters (doctor_id, patient_id, status)
router.get('/', AppointmentController.getAppointments);

// GET /api/appointments/doctor/:doctorId - Get appointments for a specific doctor
router.get('/doctor/:doctorId', AppointmentController.getDoctorAppointments);

// GET /api/appointments/patient/:patientId - Get appointments for a specific patient
router.get('/patient/:patientId', AppointmentController.getPatientAppointments);

// GET /api/appointments/:id - Get appointment by ID
router.get('/:id', AppointmentController.getAppointmentById);

// PUT /api/appointments/:id - Update appointment
router.put('/:id', AppointmentController.updateAppointment);

// DELETE /api/appointments/:id - Cancel appointment
router.delete('/:id', AppointmentController.cancelAppointment);

module.exports = router; 