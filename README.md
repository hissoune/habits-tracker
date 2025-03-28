# Habits Tracker App

## Overview

The **Habits Tracker App** is a distributed microservices-based application designed to help users manage and track their daily habits. The application is built with **NestJS** and follows a monorepo structure. It uses RabbitMQ for inter-service communication and JWT for authentication.

---

## Table of Contents

1. [Architecture](#architecture)
2. [Services](#services)
   - [Gateway Service](#gateway-service)
   - [Auth Service](#auth-service)
   - [Habits Service](#habits-service)
   - [Challenges Service](#chalenges-service)
   - [Notifications Service](#notifications-service)
   - [Chat Service](#chat-service)
3. [Setup and Installation](#setup-and-installation)
4. [Running the Application](#running-the-application)
5. [Environment Variables](#environment-variables)
6. [API Endpoints](#api-endpoints)
7. [Inter-Service Communication](#inter-service-communication)
8. [Development Commands](#development-commands)

---

## Architecture

The Habits Tracker App is composed of the following:

- **Gateway Service:** The entry point for client requests. Handles routing and communication with other services.
- **Auth Service:** Responsible for user authentication and authorization using JWT.
- **Habits Service:** Manages habit-related functionalities such as creating, updating, and deleting habits.
- **Challenges Service:** Manages chalenges-related functionalities such as creating, updating, and deleting ,joining chalenges.
- **Notifications Service:** this service is the responsible of sending the notifications to the user .
 
### Communication

- **Message Broker:** RabbitMQ is used for asynchronous communication between services.
- **REST APIs:** Services expose endpoints to interact with the application.
- **JWT Authentication:** Secure communication between the client and services.

---

## Services

### Gateway Service

- **Path:** `apps/habits-tracker-gateway`
- **Description:** Serves as the API gateway. Routes requests to the respective microservices.
- **Port:** `5000`

### Auth Service

- **Path:** `apps/auth-service`
- **Description:** Handles user registration, login, and authentication.
- **Port:** `3001`

### Habits Service

- **Path:** `apps/habits-service`
- **Description:** Manages habits, including CRUD operations for user habits.
- **Port:** `3002`

- **Path:** `apps/chalenges-service`
- **Description:** Manages chalenges, including CRUD operations for user chalenges .
- **Port:** `3003`

- **Path:** `apps/notifications-service`
- **Description:** send notifications to the client  .
- **Port:** `3006`

---

## Setup and Installation

### Prerequisites

- Node.js (v18 or above)
- PNPM
- RabbitMQ (running on default port `5672`)

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/hissoune/habits-tracker.git
   cd habits-tracker
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Build the app:

   ```bash
   pnpm run build
   ```

---

## Running the Application

### Development

Start all services in development mode:

```bash
pnpm run start:dev
```

### Production

1. Build the application:
   ```bash
   pnpm run build
   ```
2. Start services in production:
   ```bash
   pnpm run start:prod
   ```

---

## Environment Variables

Each service has its own `.env` file located in its respective folder. Below is a sample configuration for each service:

### Gateway Service (`apps/habits-tracker-gateway/.env`)

```
JWT_SECRET=your_secret
MONGO_URI_AUTH=mongodb://127.0.0.1:27017/yourDbAuth
MONGO_URI_HABITS=mongodb://127.0.0.1:27017/habitsDb
MONGO_URI_CHALENGES=mongodb://127.0.0.1:27017/chalengesDb
MONGO_URI_NOTIFICATIONS=mongodb://127.0.0.1:27017/notificationsDb
APP_EMAIL=your email
APP_EMAIL_PASS=your password 
```


## API Endpoints

### Gateway Service

| Method | Endpoint         |  Description                  |
| ------ | ---------------- | -----------------------------|
| *      | `*`              |  dispatch to other services   |


### Auth Service

| Method | Endpoint    | Description         |
| ------ | ----------- | ------------------- |
| POST   | `/login`    | Authenticate a user |
| POST   | `/register` | Register a new user |

### Habits Service

| Method | Endpoint      | Description              |
| ------ | ------------- | ------------------------ |
| GET    | `/habits`     | List all habits          |
| POST   | `/habits`     | Create a new habit       |
| PUT    | `/habits/:id` | Update an existing habit |
| DELETE | `/habits/:id` | Delete a habit           |

---

## Inter-Service Communication

The services communicate using RabbitMQ for decoupled, asynchronous messaging. Below are the key RabbitMQ queues used:

- **`auth.login`**** Queue:** Handles login events.
- **`habits.create`**** Queue:** Handles habit creation events.

---

## Development Commands

| Command              | Description                      |
| -------------------- | -------------------------------- |
| `pnpm run start`     | Start the app in production mode |
| `pnpm run start:dev` | Start all services in dev mode   |
| `pnpm run build`     | Build all services               |
| `pnpm run test`      | Run unit tests                   |

---

