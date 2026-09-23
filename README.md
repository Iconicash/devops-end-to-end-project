# DevOps Todo App
# DevOps Todo App

[![CI](https://github.com/Iconicash/devops-end-to-end-project/actions/workflows/ci.yml/badge.svg)](https://github.com/Iconicash/devops-end-to-end-project/actions/workflows/ci.yml)
[![CD](https://github.com/Iconicash/devops-end-to-end-project/actions/workflows/cd.yml/badge.svg)](https://github.com/Iconicash/devops-end-to-end-project/actions/workflows/cd.yml)

A simple Todo REST API + frontend, built as the base application for an
end-to-end DevOps learning project: Docker → CI/CD → Kubernetes → Terraform → Monitoring.

## Tech Stack
- Node.js + Express (API)
- MongoDB (database)
- Docker + Docker Compose (containerization)
- Vanilla HTML/JS (frontend)

## Run locally (without Docker)
```bash
npm install
# make sure MongoDB is running locally on port 27017, or set MONGO_URI
npm run dev
```
Visit http://localhost:3000

## Run with Docker Compose (recommended)
```bash
docker compose up --build
```
Visit http://localhost:3000

## Run tests
```bash
npm test
```

## API Endpoints
| Method | Endpoint         | Description        |
|--------|------------------|---------------------|
| GET    | /api/todos       | List all todos      |
| POST   | /api/todos       | Create a todo       |
| PUT    | /api/todos/:id   | Update a todo       |
| DELETE | /api/todos/:id   | Delete a todo       |
| GET    | /health          | Liveness probe      |
| GET    | /ready           | Readiness probe     |

## Project Roadmap
- [x] Week 1: App + Docker + Docker Compose
- [x] Week 2: CI/CD with GitHub Actions
- [ ] Week 3: Terraform + Kubernetes deployment
- [ ] Week 4: Prometheus + Grafana monitoring
