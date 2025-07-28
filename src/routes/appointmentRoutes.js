const express = require('express');
const AppointmentController = require('../controllers/appointmentController');
const { validateAppointment, validatePagination } = require('../middleware/validation');

const router = express.Router();

/**
 * @swagger
 * /api/appointments:
 *   post:
 *     summary: Book an appointment
 *     description: Create a new appointment booking
 *     tags: [Appointments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - doctor_id
 *               - patient_id
 *               - date
 *               - time
 *             properties:
 *               doctor_id:
 *                 type: integer
 *                 example: 1
 *               patient_id:
 *                 type: integer
 *                 example: 101
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2024-01-20"
 *               time:
 *                 type: string
 *                 example: "10:00 AM"
 *               reason:
 *                 type: string
 *                 example: "Heart checkup"
 *     responses:
 *       201:
 *         description: Appointment booked successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Appointment'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             $ref: '#/components/schemas/Error'
 *       404:
 *         description: Doctor not found
 *         content:
 *           application/json:
 *             $ref: '#/components/schemas/Error'
 *       409:
 *         description: Time slot not available
 *         content:
 *           application/json:
 *             $ref: '#/components/schemas/Error'
 */
router.post('/', validateAppointment, AppointmentController.bookAppointment);

/**
 * @swagger
 * /api/appointments:
 *   get:
 *     summary: Get appointments
 *     description: Retrieve appointments with optional filters and pagination
 *     tags: [Appointments]
 *     parameters:
 *       - in: query
 *         name: doctor_id
 *         schema:
 *           type: integer
 *         description: Filter by doctor ID
 *       - in: query
 *         name: patient_id
 *         schema:
 *           type: integer
 *         description: Filter by patient ID
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, confirmed, cancelled]
 *         description: Filter by appointment status
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: Appointments retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Appointment'
 *                 total:
 *                   type: integer
 *                 page:
 *                   type: integer
 *                 limit:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 */
router.get('/', validatePagination, AppointmentController.getAppointments);

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