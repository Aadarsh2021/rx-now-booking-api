// In-memory storage for doctors
let doctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialization: "Cardiology",
    experience: "15 years",
    timings: "9:00 AM - 5:00 PM",
    location: "City Medical Center",
    rating: 4.8,
    consultationFee: 150
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialization: "Neurology",
    experience: "12 years",
    timings: "10:00 AM - 6:00 PM",
    location: "Neurology Institute",
    rating: 4.6,
    consultationFee: 200
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialization: "Pediatrics",
    experience: "8 years",
    timings: "8:00 AM - 4:00 PM",
    location: "Children's Hospital",
    rating: 4.9,
    consultationFee: 120
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    specialization: "Orthopedics",
    experience: "20 years",
    timings: "9:00 AM - 7:00 PM",
    location: "Sports Medicine Center",
    rating: 4.7,
    consultationFee: 180
  },
  {
    id: 5,
    name: "Dr. Lisa Thompson",
    specialization: "Dermatology",
    experience: "10 years",
    timings: "11:00 AM - 7:00 PM",
    location: "Skin Care Clinic",
    rating: 4.5,
    consultationFee: 140
  }
];

class DoctorModel {
  // Get all doctors
  static getAllDoctors() {
    return doctors;
  }

  // Get doctor by ID
  static getDoctorById(id) {
    return doctors.find(doctor => doctor.id === parseInt(id));
  }

  // Add new doctor
  static addDoctor(doctorData) {
    const newDoctor = {
      id: doctors.length + 1,
      ...doctorData
    };
    doctors.push(newDoctor);
    return newDoctor;
  }

  // Update doctor
  static updateDoctor(id, updateData) {
    const index = doctors.findIndex(doctor => doctor.id === parseInt(id));
    if (index !== -1) {
      doctors[index] = { ...doctors[index], ...updateData };
      return doctors[index];
    }
    return null;
  }

  // Delete doctor
  static deleteDoctor(id) {
    const index = doctors.findIndex(doctor => doctor.id === parseInt(id));
    if (index !== -1) {
      const deletedDoctor = doctors[index];
      doctors.splice(index, 1);
      return deletedDoctor;
    }
    return null;
  }

  // Get doctors by specialization
  static getDoctorsBySpecialization(specialization) {
    return doctors.filter(doctor => 
      doctor.specialization.toLowerCase().includes(specialization.toLowerCase())
    );
  }
}

module.exports = DoctorModel; 