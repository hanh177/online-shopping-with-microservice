
# Small online shopping system
A Microservices-based order management system built with Node.js (Express), MongoDB, Docker, and RabbitMQ. Each service runs independently and communicates through an API Gateway and Message Queue for asynchronous operations.

## Tech Stack
- Node.js + Express.js
- MongoDB (database)
- RabbitMQ (message queue)
- Docker + Docker Compose (containerization)
- Nginx (reverse proxy for API Gateway)

## System Architecture
 
                                
        Client → API Gateway → [User Service, Product Service, Order Service] → MongoDB 
                                        ↓  
                                Notification Service ← RabbitMQ  

                      
## Project Structure
    project-root/
        ├── api-gateway/           
        ├── user-service/          
        ├── product-service/       
        ├── order-service/         
        ├── notification-service/  
        ├── docker-compose.yml     
        └── README.md

## Getting Started

## Message Queue Flow
- Order Service sends a message when an order is created.
- Notification Service listens to RabbitMQ and sends notifications.

## Contributors
Anh Ha, haanh17722@gmail.com