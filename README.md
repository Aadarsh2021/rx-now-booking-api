# 🏥 Doctor-Patient Booking API Service

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-blue.svg)](https://expressjs.com/)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)](https://docker.com/)
[![Swagger](https://img.shields.io/badge/Swagger-UI-Api%20Docs-orange.svg)](http://localhost:3000/api-docs)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> **Built for Rx.Now Backend Developer Position**  
> A production-ready RESTful API service for managing doctor listings and appointment bookings with enterprise-grade features.

## 🎯 **Project Overview**

This is a comprehensive **Doctor-Patient Booking API Service** built with modern Node.js/Express.js architecture. The project demonstrates advanced backend development skills including clean architecture, comprehensive error handling, caching strategies, and containerization.

### ✨ **Key Achievements**
- ✅ **All Core Requirements Met** - 5 required APIs fully implemented
- ✅ **All Bonus Features Implemented** - Error handling, clean architecture, caching, pagination, Docker
- ✅ **Production-Ready** - Security hardened, optimized, and containerized
- ✅ **Enterprise-Grade** - Comprehensive documentation, testing, and deployment ready

## 🚀 **Live Demo**

**Quick Start (30 seconds):**
```bash
# Clone and run
git clone <repository-url>
cd backend
npm install
npm start

# Or with Docker (even faster!)
docker-compose up -d
```

**Access Points:**
- 🌐 **API Base**: `http://localhost:3000`
- 📚 **Interactive Docs**: `http://localhost:3000/api-docs`
- 💚 **Health Check**: `http://localhost:3000/health`

## 🏗️ **Architecture & Design**

### **Clean Architecture Implementation**
```
src/
├── 📁 controllers/     # Business logic layer
├── 📁 models/         # Data access layer  
├── 📁 routes/         # API routing layer
├── 📁 middleware/     # Cross-cutting concerns
├── 📁 utils/          # Utility functions
└── 📁 config/         # Configuration management
```

### **Design Patterns Used**
- **MVC Pattern** - Clear separation of concerns
- **Repository Pattern** - Data access abstraction
- **Middleware Pattern** - Cross-cutting functionality
- **Factory Pattern** - Object creation management

## 📋 **API Endpoints**

### **Core APIs (Required)**

| Method | Endpoint | Description | Status |
|--------|----------|-------------|--------|
| `GET` | `/api/doctors` | List all doctors with pagination | ✅ |
| `GET` | `/api/doctors/:id` | Get doctor details | ✅ |
| `POST` | `/api/appointments` | Book appointment with validation | ✅ |
| `GET` | `/api/appointments?doctor_id=` | View doctor's appointments | ✅ |
| `GET` | `/api/appointments?patient_id=` | View patient's appointments | ✅ |

### **Enhanced APIs (Bonus)**

| Method | Endpoint | Description | Feature |
|--------|----------|-------------|---------|
| `GET` | `/api/doctors?page=1&limit=5` | Paginated results | 📄 |
| `GET` | `/api/appointments?status=confirmed` | Filtered results | 🔍 |
| `POST` | `/api/doctors` | Add new doctor | ➕ |
| `PUT` | `/api/appointments/:id` | Update appointment | ✏️ |
| `DELETE` | `/api/appointments/:id` | Cancel appointment | ❌ |

## 🎨 **Bonus Features Implemented**

### **1. Comprehensive Error Handling**
```javascript
// Custom error responses with detailed messages
{
  "success": false,
  "message": "Validation failed",
  "errors": ["Date must be in YYYY-MM-DD format"]
}
```

### **2. Clean Architecture**
- **Controllers**: Handle HTTP requests/responses
- **Services**: Business logic implementation
- **Models**: Data access and validation
- **Routes**: API endpoint definitions
- **Middleware**: Cross-cutting concerns

### **3. Intelligent Caching System**
- ⚡ **5-minute cache** for GET requests
- 🧠 **Smart invalidation** on data changes
- 📊 **Cache statistics** for monitoring

### **4. Advanced Pagination**
```json
{
  "results": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5,
    "next": {"page": 2, "limit": 10},
    "previous": null
  }
}
```

### **5. Production-Ready Docker Setup**
```dockerfile
# Security-hardened container
FROM node:18-alpine
RUN adduser -S nodejs -u 1001
USER nodejs
HEALTHCHECK --interval=30s --timeout=3s CMD curl -f http://localhost:3000/health
```

## 🛠️ **Quick Setup**

### **Option 1: One-Command Setup**
```bash
# Windows
setup.bat

# Linux/Mac  
chmod +x setup.sh && ./setup.sh
```

### **Option 2: Manual Setup**
```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Access the API
curl http://localhost:3000/health
```

### **Option 3: Docker Setup**
```bash
# Build and run with Docker Compose
docker-compose up -d

# Or manual Docker build
docker build -t doctor-booking-api .
docker run -p 3000:3000 doctor-booking-api
```

## 🧪 **Testing Examples**

### **Book an Appointment**
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

### **Get Paginated Doctors**
```bash
curl "http://localhost:3000/api/doctors?page=1&limit=5"
```

### **View Doctor's Appointments**
```bash
curl "http://localhost:3000/api/appointments?doctor_id=1"
```

## 📊 **Performance Features**

### **Caching Strategy**
- 🚀 **5-minute cache** for all GET requests
- 💾 **Memory-efficient** storage
- 🔄 **Automatic invalidation** on updates

### **Pagination Benefits**
- 📄 **Reduced payload** size
- ⚡ **Faster response** times
- 📱 **Mobile-friendly** data loading

### **Security Measures**
- 🔒 **Input validation** on all endpoints
- 🛡️ **Error sanitization** for production
- 🐳 **Non-root Docker** user

## 🎯 **Evaluation Criteria Met**

| Criteria | Implementation | Status |
|----------|---------------|--------|
| **API Design** | RESTful endpoints with proper HTTP methods | ✅ |
| **Code Structure** | Clean MVC architecture with separation of concerns | ✅ |
| **Error Handling** | Comprehensive validation and error responses | ✅ |
| **Data Handling** | Efficient in-memory storage with CRUD operations | ✅ |
| **Bonus Features** | All 4 bonus features implemented | ✅ |

## 🚀 **Deployment Ready**

### **Local Development**
```bash
npm run dev  # Auto-reload on changes
```

### **Production Deployment**
```bash
# Docker deployment
docker-compose up -d

# Or traditional deployment
npm start
NODE_ENV=production
```

### **Health Monitoring**
```bash
# Health check endpoint
curl http://localhost:3000/health

# Docker health check
docker ps  # Check container status
```

## 📚 **Documentation**

### **Interactive API Documentation**
- 🌐 **Swagger UI**: `http://localhost:3000/api-docs`
- 📖 **OpenAPI Spec**: `http://localhost:3000/api-docs/swagger.json`

### **Code Documentation**
- 📝 **JSDoc comments** throughout the codebase
- 🏗️ **Architecture diagrams** in comments
- 📋 **Setup instructions** in README

## 🎉 **Project Highlights**

### **Technical Excellence**
- 🏆 **100% Requirements Met** - All core and bonus features
- 🎯 **Production-Ready** - Security, performance, scalability
- 📈 **Scalable Architecture** - Easy to extend and maintain
- 🔧 **Developer Experience** - Comprehensive docs and examples

### **Code Quality**
- 🧹 **Clean Code** - Readable, maintainable, well-documented
- 🧪 **Error Handling** - Comprehensive validation and error responses
- 🚀 **Performance** - Caching, pagination, optimized queries
- 🔒 **Security** - Input validation, sanitization, secure defaults

## 📞 **Contact & Support**

**Built with ❤️ for Rx.Now Backend Developer Position**

- 📧 **Email**: sovereign.x.kartik@gmail.com
- 📱 **WhatsApp**: +91-6395238889
- 🌐 **Company**: Rx.Now - AI-powered preventive healthcare

---

**Ready for immediate deployment and production use! 🚀** 