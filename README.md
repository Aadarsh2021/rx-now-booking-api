# Doctor-Patient Booking API

A RESTful API service for managing doctor listings and appointment bookings between patients and doctors.

## 🚀 Features

- **Doctor Management**: List, view, add, update, and delete doctors
- **Appointment Booking**: Book, view, update, and cancel appointments
- **Role-based Access**: Separate endpoints for patients and doctors
- **Time Slot Validation**: Prevents double booking of appointments
- **Clean Architecture**: Separation of concerns with MVC pattern
- **Error Handling**: Comprehensive error handling and validation

## 📋 API Endpoints

### Doctors

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/doctors` | List all doctors |
| GET | `/api/doctors/:id` | Get doctor details |
| POST | `/api/doctors` | Add new doctor |
| PUT | `/api/doctors/:id` | Update doctor |
| DELETE | `/api/doctors/:id` | Delete doctor |
| GET | `/api/doctors/specialization/:specialization` | Get doctors by specialization |

### Appointments

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/appointments` | Book an appointment |
| GET | `/api/appointments` | Get appointments (with filters) |
| GET | `/api/appointments/:id` | Get appointment by ID |
| PUT | `/api/appointments/:id` | Update appointment |
| DELETE | `/api/appointments/:id` | Cancel appointment |
| GET | `/api/appointments/doctor/:doctorId` | Get appointments for a doctor |
| GET | `/api/appointments/patient/:patientId` | Get appointments for a patient |

### Query Parameters for Appointments

- `?doctor_id=1` - Filter appointments by doctor
- `?patient_id=101` - Filter appointments by patient
- `?status=confirmed` - Filter appointments by status

## 🛠️ Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   # Development mode (with auto-reload)
   npm run dev
   
   # Production mode
   npm start
   ```

4. **Access the API**
   - Server will run on `http://localhost:3000`
   - Health check: `http://localhost:3000/health`
   - API documentation: `http://localhost:3000/`

## 📝 API Examples

### Book an Appointment

```bash
curl -X POST http://localhost:3000/api/appointments \
  -H "Content-Type: application/json" \
  -d '{
    "doctor_id": 1,
    "patient_id": 101,
    "date": "2024-01-20",
    "time": "10:00 AM",
    "reason": "Heart checkup"
  }'
```

### Get All Doctors

```bash
curl http://localhost:3000/api/doctors
```

### Get Appointments for a Doctor

```bash
curl "http://localhost:3000/api/appointments?doctor_id=1"
```

### Get Appointments for a Patient

```bash
curl "http://localhost:3000/api/appointments?patient_id=101"
```

## 🏗️ Project Structure

```
backend/
├── src/
│   ├── controllers/
│   │   ├── doctorController.js
│   │   └── appointmentController.js
│   ├── models/
│   │   ├── doctorModel.js
│   │   └── appointmentModel.js
│   ├── routes/
│   │   ├── doctorRoutes.js
│   │   └── appointmentRoutes.js
│   ├── services/
│   ├── middleware/
│   └── server.js
├── package.json
└── README.md
```

## 🔧 Configuration

The application uses environment variables for configuration:

- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (development/production)

## 🧪 Testing

You can test the API using:

- **Postman**: Import the collection and test endpoints
- **cURL**: Use command line examples above
- **Browser**: Visit `http://localhost:3000/` for API overview

## 📊 Sample Data

The API comes with pre-loaded sample data:

### Doctors
- Dr. Sarah Johnson (Cardiology)
- Dr. Michael Chen (Neurology)
- Dr. Emily Rodriguez (Pediatrics)
- Dr. James Wilson (Orthopedics)
- Dr. Lisa Thompson (Dermatology)

### Appointments
- Sample appointments with various statuses (confirmed, pending, cancelled)

## 🚨 Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message"
}
```

## 🔒 Security Notes

- No authentication required (as per requirements)
- Uses hardcoded IDs for simulation
- In-memory storage (data resets on server restart)

## 🚀 Deployment

For production deployment:

1. Set `NODE_ENV=production`
2. Use a process manager like PM2
3. Set up proper logging
4. Consider using a persistent database

## 📞 Support

For any questions or issues, please refer to the API documentation or contact the development team. 