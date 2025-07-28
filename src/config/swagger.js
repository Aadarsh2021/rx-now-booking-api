const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Doctor-Patient Booking API',
      version: '1.0.0',
      description: 'A RESTful API service for managing doctor listings and appointment bookings between patients and doctors.',
      contact: {
        name: 'Rx.Now Team',
        email: 'sovereign.x.kartik@gmail.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server'
      }
    ],
    components: {
      schemas: {
        Doctor: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            name: { type: 'string', example: 'Dr. Sarah Johnson' },
            specialization: { type: 'string', example: 'Cardiology' },
            experience: { type: 'string', example: '15 years' },
            timings: { type: 'string', example: '9:00 AM - 5:00 PM' },
            location: { type: 'string', example: 'City Medical Center' },
            rating: { type: 'number', example: 4.8 },
            consultationFee: { type: 'number', example: 150 }
          }
        },
        Appointment: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            doctor_id: { type: 'integer', example: 1 },
            patient_id: { type: 'integer', example: 101 },
            date: { type: 'string', format: 'date', example: '2024-01-15' },
            time: { type: 'string', example: '10:00 AM' },
            status: { type: 'string', enum: ['pending', 'confirmed', 'cancelled'], example: 'confirmed' },
            reason: { type: 'string', example: 'Heart checkup' },
            createdAt: { type: 'string', format: 'date-time' }
          }
        },
        Error: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string', example: 'Error description' },
            error: { type: 'string', example: 'Detailed error message' }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.js', './src/controllers/*.js']
};

const specs = swaggerJsdoc(options);

module.exports = specs; 