const express = require('express');
const DoctorController = require('../controllers/doctorController');
const { validateDoctor, validatePagination } = require('../middleware/validation');

const router = express.Router();

/**
 * @swagger
 * /api/doctors:
 *   get:
 *     summary: Get all doctors
 *     description: Retrieve a list of all doctors with optional pagination
 *     tags: [Doctors]
 *     parameters:
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
 *         description: List of doctors retrieved successfully
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
 *                     $ref: '#/components/schemas/Doctor'
 *                 total:
 *                   type: integer
 *                 page:
 *                   type: integer
 *                 limit:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 */
router.get('/', validatePagination, DoctorController.getAllDoctors);

/**
 * @swagger
 * /api/doctors/{id}:
 *   get:
 *     summary: Get doctor by ID
 *     description: Retrieve a specific doctor by their ID
 *     tags: [Doctors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Doctor ID
 *     responses:
 *       200:
 *         description: Doctor retrieved successfully
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
 *                   $ref: '#/components/schemas/Doctor'
 *       404:
 *         description: Doctor not found
 *         content:
 *           application/json:
 *             $ref: '#/components/schemas/Error'
 */
router.get('/:id', DoctorController.getDoctorById);

/**
 * @swagger
 * /api/doctors:
 *   post:
 *     summary: Add new doctor
 *     description: Create a new doctor record
 *     tags: [Doctors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - specialization
 *               - timings
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Dr. John Smith"
 *               specialization:
 *                 type: string
 *                 example: "Cardiology"
 *               experience:
 *                 type: string
 *                 example: "10 years"
 *               timings:
 *                 type: string
 *                 example: "9:00 AM - 5:00 PM"
 *               location:
 *                 type: string
 *                 example: "City Medical Center"
 *               rating:
 *                 type: number
 *                 example: 4.5
 *               consultationFee:
 *                 type: number
 *                 example: 150
 *     responses:
 *       201:
 *         description: Doctor created successfully
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
 *                   $ref: '#/components/schemas/Doctor'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             $ref: '#/components/schemas/Error'
 */
router.post('/', validateDoctor, DoctorController.addDoctor);

// PUT /api/doctors/:id - Update doctor
router.put('/:id', DoctorController.updateDoctor);

// DELETE /api/doctors/:id - Delete doctor
router.delete('/:id', DoctorController.deleteDoctor);

// GET /api/doctors/specialization/:specialization - Get doctors by specialization
router.get('/specialization/:specialization', DoctorController.getDoctorsBySpecialization);

module.exports = router; 