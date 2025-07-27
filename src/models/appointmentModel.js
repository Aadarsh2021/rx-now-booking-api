// In-memory storage for appointments
let appointments = [
  {
    id: 1,
    doctor_id: 1,
    patient_id: 101,
    date: "2024-01-15",
    time: "10:00 AM",
    status: "confirmed",
    reason: "Heart checkup",
    createdAt: "2024-01-10T10:00:00Z"
  },
  {
    id: 2,
    doctor_id: 2,
    patient_id: 102,
    date: "2024-01-16",
    time: "2:00 PM",
    status: "pending",
    reason: "Headache consultation",
    createdAt: "2024-01-11T14:30:00Z"
  },
  {
    id: 3,
    doctor_id: 3,
    patient_id: 103,
    date: "2024-01-17",
    time: "9:00 AM",
    status: "confirmed",
    reason: "Child vaccination",
    createdAt: "2024-01-12T09:15:00Z"
  },
  {
    id: 4,
    doctor_id: 1,
    patient_id: 104,
    date: "2024-01-18",
    time: "3:00 PM",
    status: "cancelled",
    reason: "ECG test",
    createdAt: "2024-01-13T16:45:00Z"
  },
  {
    id: 5,
    doctor_id: 4,
    patient_id: 105,
    date: "2024-01-19",
    time: "11:00 AM",
    status: "confirmed",
    reason: "Knee pain",
    createdAt: "2024-01-14T11:20:00Z"
  }
];

class AppointmentModel {
  // Get all appointments
  static getAllAppointments() {
    return appointments;
  }

  // Get appointment by ID
  static getAppointmentById(id) {
    return appointments.find(appointment => appointment.id === parseInt(id));
  }

  // Get appointments by doctor ID
  static getAppointmentsByDoctorId(doctorId) {
    return appointments.filter(appointment => 
      appointment.doctor_id === parseInt(doctorId)
    );
  }

  // Get appointments by patient ID
  static getAppointmentsByPatientId(patientId) {
    return appointments.filter(appointment => 
      appointment.patient_id === parseInt(patientId)
    );
  }

  // Create new appointment
  static createAppointment(appointmentData) {
    const newAppointment = {
      id: appointments.length + 1,
      ...appointmentData,
      status: appointmentData.status || 'pending',
      createdAt: new Date().toISOString()
    };
    appointments.push(newAppointment);
    return newAppointment;
  }

  // Update appointment
  static updateAppointment(id, updateData) {
    const index = appointments.findIndex(appointment => appointment.id === parseInt(id));
    if (index !== -1) {
      appointments[index] = { ...appointments[index], ...updateData };
      return appointments[index];
    }
    return null;
  }

  // Delete appointment
  static deleteAppointment(id) {
    const index = appointments.findIndex(appointment => appointment.id === parseInt(id));
    if (index !== -1) {
      const deletedAppointment = appointments[index];
      appointments.splice(index, 1);
      return deletedAppointment;
    }
    return null;
  }

  // Check if time slot is available
  static isTimeSlotAvailable(doctorId, date, time) {
    return !appointments.some(appointment => 
      appointment.doctor_id === parseInt(doctorId) &&
      appointment.date === date &&
      appointment.time === time &&
      appointment.status !== 'cancelled'
    );
  }

  // Get appointments by status
  static getAppointmentsByStatus(status) {
    return appointments.filter(appointment => 
      appointment.status === status
    );
  }
}

module.exports = AppointmentModel; 