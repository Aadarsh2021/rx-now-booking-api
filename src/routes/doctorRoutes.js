const express = require('express');
const DoctorController = require('../controllers/doctorController');

const router = express.Router();

// GET /api/doctors - List all doctors
router.get('/', DoctorController.getAllDoctors);

// GET /api/doctors/:id - Get doctor details
router.get('/:id', DoctorController.getDoctorById);

// POST /api/doctors - Add new doctor
router.post('/', DoctorController.addDoctor);

// PUT /api/doctors/:id - Update doctor
router.put('/:id', DoctorController.updateDoctor);

// DELETE /api/doctors/:id - Delete doctor
router.delete('/:id', DoctorController.deleteDoctor);

// GET /api/doctors/specialization/:specialization - Get doctors by specialization
router.get('/specialization/:specialization', DoctorController.getDoctorsBySpecialization);

module.exports = router; 