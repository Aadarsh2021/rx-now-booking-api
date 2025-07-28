# 🧪 Quick Test Guide for Recruiters

## 🚀 30-Second Setup

```bash
# Clone and run
git clone https://github.com/Aadarsh2021/rx-now-booking-api.git
cd rx-now-booking-api
npm install
npm start
```

## 📋 Test All Required APIs

### 1. Health Check
```bash
curl http://localhost:3000/health
```

### 2. Get All Doctors (Required API)
```bash
curl http://localhost:3000/api/doctors
```

### 3. Get Doctor Details (Required API)
```bash
curl http://localhost:3000/api/doctors/1
```

### 4. Book Appointment (Required API)
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

### 5. Get Doctor's Appointments (Required API)
```bash
curl "http://localhost:3000/api/appointments?doctor_id=1"
```

### 6. Get Patient's Appointments (Required API)
```bash
curl "http://localhost:3000/api/appointments?patient_id=101"
```

## 🎨 Test Bonus Features

### 7. Pagination (Bonus Feature)
```bash
curl "http://localhost:3000/api/doctors?page=1&limit=3"
```

### 8. Swagger Documentation (Bonus Feature)
Open: http://localhost:3000/api-docs

### 9. Docker Test (Bonus Feature)
```bash
docker-compose up -d
curl http://localhost:3000/health
```

## ✅ Expected Results

All APIs should return:
- **Status 200/201** for successful requests
- **Proper JSON responses** with data
- **Error handling** for invalid inputs
- **Pagination metadata** for list endpoints

## 🎯 Key Features to Notice

1. **Clean Architecture** - Well-organized code structure
2. **Error Handling** - Comprehensive validation messages
3. **Performance** - Caching and pagination
4. **Documentation** - Interactive Swagger UI
5. **Production Ready** - Docker support and security 