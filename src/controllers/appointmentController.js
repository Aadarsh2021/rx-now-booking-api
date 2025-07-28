const AppointmentModel = require('../models/appointmentModel');
const DoctorModel = require('../models/doctorModel');
const { paginateResults } = require('../utils/pagination');

class AppointmentController {
  // POST /api/appointments - Book an appointment
  static async bookAppointment(req, res) {
    try {
      const { doctor_id, patient_id, date, time, reason } = req.body;

      // Validation
      if (!doctor_id || !patient_id || !date || !time) {
        return res.status(400).json({
          success: false,
          message: 'Missing required fields',
          error: 'Doctor ID, patient ID, date, and time are required'
        });
      }

      // Check if doctor exists
      const doctor = DoctorModel.getDoctorById(doctor_id);
      if (!doctor) {
        return res.status(404).json({
          success: false,
          message: 'Doctor not found',
          error: `No doctor found with ID: ${doctor_id}`
        });
      }

      // Check if time slot is available
      const isAvailable = AppointmentModel.isTimeSlotAvailable(doctor_id, date, time);
      if (!isAvailable) {
        return res.status(409).json({
          success: false,
          message: 'Time slot not available',
          error: `The selected time slot (${date} at ${time}) is already booked`
        });
      }

      const appointmentData = {
        doctor_id: parseInt(doctor_id),
        patient_id: parseInt(patient_id),
        date,
        time,
        reason: reason || 'General consultation',
        status: 'pending'
      };

      const newAppointment = AppointmentModel.createAppointment(appointmentData);

      res.status(201).json({
        success: true,
        message: 'Appointment booked successfully',
        data: newAppointment
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error booking appointment',
        error: error.message
      });
    }
  }

  // GET /api/appointments - Get appointments with filters
  static async getAppointments(req, res) {
    try {
      const { doctor_id, patient_id, status, page = 1, limit = 10 } = req.query;

      let appointments;

      if (doctor_id) {
        appointments = AppointmentModel.getAppointmentsByDoctorId(doctor_id);
      } else if (patient_id) {
        appointments = AppointmentModel.getAppointmentsByPatientId(patient_id);
      } else if (status) {
        appointments = AppointmentModel.getAppointmentsByStatus(status);
      } else {
        appointments = AppointmentModel.getAllAppointments();
      }

      const paginatedResults = paginateResults(appointments, parseInt(page), parseInt(limit));

      res.json({
        success: true,
        message: 'Appointments retrieved successfully',
        ...paginatedResults
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error retrieving appointments',
        error: error.message
      });
    }
  }

  // GET /api/appointments/:id - Get appointment by ID
  static async getAppointmentById(req, res) {
    try {
      const { id } = req.params;
      const appointment = AppointmentModel.getAppointmentById(id);

      if (!appointment) {
        return res.status(404).json({
          success: false,
          message: 'Appointment not found',
          error: `No appointment found with ID: ${id}`
        });
      }

      res.json({
        success: true,
        message: 'Appointment retrieved successfully',
        data: appointment
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error retrieving appointment',
        error: error.message
      });
    }
  }

  // PUT /api/appointments/:id - Update appointment
  static async updateAppointment(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      // If updating date/time, check availability
      if ((updateData.date || updateData.time) && updateData.doctor_id) {
        const appointment = AppointmentModel.getAppointmentById(id);
        if (!appointment) {
          return res.status(404).json({
            success: false,
            message: 'Appointment not found',
            error: `No appointment found with ID: ${id}`
          });
        }

        const newDate = updateData.date || appointment.date;
        const newTime = updateData.time || appointment.time;
        const doctorId = updateData.doctor_id || appointment.doctor_id;

        // Check if new time slot is available (excluding current appointment)
        const conflictingAppointments = AppointmentModel.getAllAppointments().filter(apt => 
          apt.id !== parseInt(id) &&
          apt.doctor_id === parseInt(doctorId) &&
          apt.date === newDate &&
          apt.time === newTime &&
          apt.status !== 'cancelled'
        );

        if (conflictingAppointments.length > 0) {
          return res.status(409).json({
            success: false,
            message: 'Time slot not available',
            error: `The selected time slot (${newDate} at ${newTime}) is already booked`
          });
        }
      }

      const updatedAppointment = AppointmentModel.updateAppointment(id, updateData);

      if (!updatedAppointment) {
        return res.status(404).json({
          success: false,
          message: 'Appointment not found',
          error: `No appointment found with ID: ${id}`
        });
      }

      res.json({
        success: true,
        message: 'Appointment updated successfully',
        data: updatedAppointment
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error updating appointment',
        error: error.message
      });
    }
  }

  // DELETE /api/appointments/:id - Cancel appointment
  static async cancelAppointment(req, res) {
    try {
      const { id } = req.params;
      const cancelledAppointment = AppointmentModel.updateAppointment(id, { status: 'cancelled' });

      if (!cancelledAppointment) {
        return res.status(404).json({
          success: false,
          message: 'Appointment not found',
          error: `No appointment found with ID: ${id}`
        });
      }

      res.json({
        success: true,
        message: 'Appointment cancelled successfully',
        data: cancelledAppointment
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error cancelling appointment',
        error: error.message
      });
    }
  }

  // GET /api/appointments/doctor/:doctorId - Get appointments for a specific doctor
  static async getDoctorAppointments(req, res) {
    try {
      const { doctorId } = req.params;
      const appointments = AppointmentModel.getAppointmentsByDoctorId(doctorId);

      res.json({
        success: true,
        message: `Appointments retrieved for doctor ID: ${doctorId}`,
        data: appointments,
        count: appointments.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error retrieving doctor appointments',
        error: error.message
      });
    }
  }

  // GET /api/appointments/patient/:patientId - Get appointments for a specific patient
  static async getPatientAppointments(req, res) {
    try {
      const { patientId } = req.params;
      const appointments = AppointmentModel.getAppointmentsByPatientId(patientId);

      res.json({
        success: true,
        message: `Appointments retrieved for patient ID: ${patientId}`,
        data: appointments,
        count: appointments.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error retrieving patient appointments',
        error: error.message
      });
    }
  }
}

module.exports = AppointmentController; 