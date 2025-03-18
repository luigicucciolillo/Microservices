# RESTful API with Microservices and API Gateway using the MVC (Model-View-Controller) pattern.

## Intro

This project demonstrates a simple microservices architecture with an API Gateway. The project consists of three components:
- **API Gateway** (Node.js): Routes requests to the appropriate services.
- **Service1**  (Node.js): Handles requests at `/service1/show` and prints the received message.
- **Service2** (Node.js): Handles requests at `/service2/show` and prints the received message.

## Features

- **API Gateway** to route requests to microservices.
- **Service1** and **Service2** each accept a POST request with a `message` field in the body and print it to the console.
- **Dockerized** for academic reasons. 
- **MVC Architecture** used for organizing the application.

## Project Structure

```bash
project/
├── api-gateway/
│   ├── routes/
│   │   └── apiGatewayRoutes.js
│   ├── server.js
│   ├── Dockerfile
│   └── package.json
├── service1/
│   ├── controller/
│   │   └── service1Controller.js
│   ├── routes/
│   │   └── service1Routes.js
│   ├── server.js
│   ├── Dockerfile
│   └── package.json
├── service2/
│   ├── controller/
│   │   └── service2Controller.js
│   ├── routes/
│   │   └── service2Routes.js
│   ├── server.js
│   ├── Dockerfile
│   └── package.json
└── docker-compose.yml
```

## Build, run and test the application

- Build and start the services:
   ```bash
   docker-compose build
   docker-compose up
   ```

- Test the API:

   - For Service1:
     ```
     POST http://localhost:3000/api/service1/show
     {"message": "Hello from Service1"}
     ```

   - For Service2:
     ```
     POST http://localhost:3000/api/service2/show
     {"message": "Hello from Service2"}
     ```