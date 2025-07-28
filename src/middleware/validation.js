// Validation middleware
const validateAppointment = (req, res, next) => {
  const { doctor_id, patient_id, date, time } = req.body;

  const errors = [];

  if (!doctor_id) errors.push('Doctor ID is required');
  if (!patient_id) errors.push('Patient ID is required');
  if (!date) errors.push('Date is required');
  if (!time) errors.push('Time is required');

  // Validate date format (YYYY-MM-DD)
  if (date && !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    errors.push('Date must be in YYYY-MM-DD format');
  }

  // Validate time format
  if (time && !/^([0-1]?[0-9]|2[0-3]):[0-5][0-9] (AM|PM)$/.test(time)) {
    errors.push('Time must be in HH:MM AM/PM format');
  }

  // Validate IDs are numbers
  if (doctor_id && isNaN(parseInt(doctor_id))) {
    errors.push('Doctor ID must be a number');
  }
  if (patient_id && isNaN(parseInt(patient_id))) {
    errors.push('Patient ID must be a number');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors
    });
  }

  next();
};

const validateDoctor = (req, res, next) => {
  const { name, specialization, timings } = req.body;

  const errors = [];

  if (!name) errors.push('Name is required');
  if (!specialization) errors.push('Specialization is required');
  if (!timings) errors.push('Timings are required');

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors
    });
  }

  next();
};

const validatePagination = (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;

  if (page && (isNaN(page) || parseInt(page) < 1)) {
    return res.status(400).json({
      success: false,
      message: 'Page must be a positive number'
    });
  }

  if (limit && (isNaN(limit) || parseInt(limit) < 1 || parseInt(limit) > 100)) {
    return res.status(400).json({
      success: false,
      message: 'Limit must be between 1 and 100'
    });
  }

  next();
};

module.exports = {
  validateAppointment,
  validateDoctor,
  validatePagination
}; 