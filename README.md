build system: 
docker-compose down
docker-compose up --build


database login: docker exec -it event_postgres psql -U admin



# 📘 Cloud-Based Event Management System

### Microservices Architecture – SE4010 Assignment

---

# 🏗 1. Project Overview

This project implements a secure, containerized, microservice-based event management system deployed using Docker (Cloud deployment later via AWS ECS).

The system is divided into **4 independent microservices**, each with its own database and responsibility.

---

# 🧩 2. Microservices Breakdown

| Service              | Owner     | Responsibility                               | Database          |
| -------------------- | --------- | -------------------------------------------- | ----------------- |
| Auth Service         | Student 1 | User registration, login, JWT authentication | `auth_db`         |
| Event Service        | Student 2 | Event creation & management                  | `event_db`        |
| Registration Service | Student 3 | Student registration to events               | `registration_db` |
| Notification Service | Student 4 | Sends notifications                          | (optional DB)     |

---

# 🔁 3. Current System Status (WORKING)

## ✅ Completed

### Auth Service

* User registration
* Password hashing (pbkdf2_sha256)
* JWT token generation
* Role support (admin, student)
* Connected to `auth_db`

### Event Service

* Admin-only event creation
* JWT verification
* Connected to `event_db`

### Registration Service

* JWT verification
* Calls Event Service via REST
* Prevents duplicate registration
* Saves to `registration_db`

### Docker Setup

* 4 containers
* 1 PostgreSQL container
* Docker Compose orchestration
* Internal service networking working

---

# 🏗 4. Architecture Diagram (Conceptual)

```
Student/Admin
     ↓
Auth Service → auth_db
     ↓ (JWT)
Event Service → event_db
     ↓
Registration Service → registration_db
     ↓
Notification Service
```

Each service:

* Independent container
* Own database
* Communicates via REST

---

# 💻 5. How Team Members Set Up Locally

---

## 🔹 Step 1 – Install Requirements

Each member must install:

* Docker Desktop
* Git

---

## 🔹 Step 2 – Clone Repository

```bash
git clone <repo-url>
cd Cloud-Based-Event-Management-System
```

---

## 🔹 Step 3 – Start System

```bash
docker-compose up --build
```

This will start:

* Auth → localhost:8001
* Event → localhost:8002
* Registration → localhost:8003
* Notification → localhost:8004
* PostgreSQL → port 5432

---

## 🔹 Step 4 – Create Databases (IMPORTANT FIRST TIME ONLY)

Open new terminal:

```bash
docker exec -it <postgres-container-name> psql -U admin
```

Then run:

```sql
CREATE DATABASE auth_db;
CREATE DATABASE event_db;
CREATE DATABASE registration_db;
\q
```

Then restart:

```bash
docker-compose restart
```

---

# 🗄 6. Database Connections

Each service connects using:

```python
postgresql://admin:admin123@postgres:5432/<database_name>
```

The hostname `postgres` works because Docker Compose provides internal DNS.

---

# 👥 7. Member Responsibilities

---

## 🧑‍💻 Student 1 – Auth Service

Responsible for:

* Secure password hashing
* JWT creation
* Role management
* Token validation improvements
* Move SECRET_KEY to environment variables

Future tasks:

* Add token verification endpoint
* Improve security best practices
* Add refresh tokens (optional)

---

## 🧑‍💻 Student 2 – Event Service

Responsible for:

* Event CRUD operations
* Admin-only protection
* Capacity validation (IMPORTANT NEXT TASK)
* Event update/delete endpoints

Future tasks:

* Add update event
* Add delete event
* Add pagination

---

## 🧑‍💻 Student 3 – Registration Service

Responsible for:

* Register user to event
* Prevent duplicate registration
* Validate event existence
* Capacity check (NEXT STEP)
* Integrate Notification Service

Future tasks:

* Add cancellation endpoint
* Track registration timestamp

---

## 🧑‍💻 Student 4 – Notification Service

Responsible for:

* Implement `/notify` endpoint
* Receive registration event
* Simulate email sending
* Log notifications

Future tasks:

* Integrate with Registration Service
* Optionally use message broker

---

# 🔐 8. Security Implementation

Currently Implemented:

* Password hashing
* JWT with expiration
* Role-based authorization
* Database isolation
* Container isolation

To Improve:

* Move secrets to environment variables
* Add HTTPS (cloud phase)
* IAM roles in AWS
* Security groups

---

# 🔁 9. Inter-Service Communication

Currently:

Registration Service → calls Event Service via REST.

Next:

Registration Service → must call Notification Service after success.

Example flow:

```
Registration → Event Service → DB Insert → Notification Service
```

This ensures full 4-service integration.

---

# 📊 10. Testing Flow (For Demo)

### Admin Flow

1. Login as admin
2. Create event

### Student Flow

1. Register student
2. Login
3. Register for event

### Verify

1. Check `registration_db`
2. Confirm stored data

---

# ☁️ 11. Cloud Deployment Plan (Next Phase)

Deployment Target: AWS ECS Fargate

Flow:

```
GitHub Push
    ↓
GitHub Actions
    ↓
Build Docker Image
    ↓
Push to ECR
    ↓
Deploy to ECS
```

Each service:

* Separate ECS task
* Separate container
* Separate DB connection

---

# 📌 12. Remaining Work (Important)

## 🔥 High Priority

* Add capacity validation
* Integrate Notification Service

## 🔥 DevOps

* Add GitHub Actions
* Integrate SonarCloud
* Add Docker image push automation

## 🔥 Security

* Move secrets to environment variables
* Add .env support

---

# 🎬 13. Final Demo Plan (10 Minutes)

1. Show architecture diagram
2. Show Docker running containers
3. Show CI/CD pipeline
4. Admin creates event
5. Student registers
6. Show DB data
7. Show notification
8. Explain security measures

---

# 🏆 Current Project Level

This system already demonstrates:

✔ Microservice architecture
✔ Independent deployment
✔ Secure authentication
✔ Role-based access
✔ Database per service pattern
✔ Inter-service communication
✔ Docker containerization

This is strong assignment-level implementation.

---

# 🚀 Next Recommended Step

Now the team should:

1️⃣ Add capacity validation
2️⃣ Connect Notification Service
3️⃣ Implement CI/CD

