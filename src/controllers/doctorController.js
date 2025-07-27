const DoctorModel = require('../models/doctorModel');

class DoctorController {
  // GET /api/doctors - List all doctors
  static async getAllDoctors(req, res) {
    try {
      const doctors = DoctorModel.getAllDoctors();
      
      res.json({
        success: true,
        message: 'Doctors retrieved successfully',
        data: doctors,
        count: doctors.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error retrieving doctors',
        error: error.message
      });
    }
  }

  // GET /api/doctors/:id - Get doctor details
  static async getDoctorById(req, res) {
    try {
      const { id } = req.params;
      const doctor = DoctorModel.getDoctorById(id);

      if (!doctor) {
        return res.status(404).json({
          success: false,
          message: 'Doctor not found',
          error: `No doctor found with ID: ${id}`
        });
      }

      res.json({
        success: true,
        message: 'Doctor retrieved successfully',
        data: doctor
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error retrieving doctor',
        error: error.message
      });
    }
  }

  // POST /api/doctors - Add new doctor
  static async addDoctor(req, res) {
    try {
      const { name, specialization, experience, timings, location, rating, consultationFee } = req.body;

      // Validation
      if (!name || !specialization || !timings) {
        return res.status(400).json({
          success: false,
          message: 'Missing required fields',
          error: 'Name, specialization, and timings are required'
        });
      }

      const doctorData = {
        name,
        specialization,
        experience: experience || 'Not specified',
        timings,
        location: location || 'Not specified',
        rating: rating || 0,
        consultationFee: consultationFee || 0
      };

      const newDoctor = DoctorModel.addDoctor(doctorData);

      res.status(201).json({
        success: true,
        message: 'Doctor added successfully',
        data: newDoctor
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error adding doctor',
        error: error.message
      });
    }
  }

  // PUT /api/doctors/:id - Update doctor
  static async updateDoctor(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const updatedDoctor = DoctorModel.updateDoctor(id, updateData);

      if (!updatedDoctor) {
        return res.status(404).json({
          success: false,
          message: 'Doctor not found',
          error: `No doctor found with ID: ${id}`
        });
      }

      res.json({
        success: true,
        message: 'Doctor updated successfully',
        data: updatedDoctor
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error updating doctor',
        error: error.message
      });
    }
  }

  // DELETE /api/doctors/:id - Delete doctor
  static async deleteDoctor(req, res) {
    try {
      const { id } = req.params;
      const deletedDoctor = DoctorModel.deleteDoctor(id);

      if (!deletedDoctor) {
        return res.status(404).json({
          success: false,
          message: 'Doctor not found',
          error: `No doctor found with ID: ${id}`
        });
      }

      res.json({
        success: true,
        message: 'Doctor deleted successfully',
        data: deletedDoctor
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error deleting doctor',
        error: error.message
      });
    }
  }

  // GET /api/doctors/specialization/:specialization - Get doctors by specialization
  static async getDoctorsBySpecialization(req, res) {
    try {
      const { specialization } = req.params;
      const doctors = DoctorModel.getDoctorsBySpecialization(specialization);

      res.json({
        success: true,
        message: `Doctors found for specialization: ${specialization}`,
        data: doctors,
        count: doctors.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error retrieving doctors by specialization',
        error: error.message
      });
    }
  }
}

module.exports = DoctorController; 