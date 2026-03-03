# FitFlow 🏋️‍♂️

### Gym Management System --- Clean & Hexagonal Architecture

**FitFlow** is a gym management system designed using enterprise-level
architecture principles. It manages users, roles, memberships,
attendance, and payments, with a scalable foundation prepared for
multi-branch support and future integrations.

This project applies **Clean Architecture** and **Hexagonal Architecture
(Ports & Adapters)** to ensure separation of concerns, low coupling, and
high maintainability.

------------------------------------------------------------------------

## 🚀 Core Features

-   User management (DNI + Full Name)
-   Role-based access (Admin, Coach, Client)
-   Membership lifecycle handling
-   Payment registration per branch
-   QR-based attendance tracking
-   Exercise and routine management by level
-   Multi-branch ready (`BranchId`)
-   JWT-ready authentication structure

------------------------------------------------------------------------

## 🧠 Architecture

FitFlow follows:

-   Clean Architecture
-   Hexagonal Architecture (Ports & Adapters)
-   Strict layer separation
-   Dependency inversion principles

### Project Structure

FitFlow ├── FitFlow.Domain ├── FitFlow.Application ├──
FitFlow.Infrastructure └── FitFlow.Api

### Layer Responsibilities

**Domain** - Entities - Enums - Business rules - Framework-independent
core

**Application** - Use cases - Interfaces (Ports) - DTOs - Application
logic

**Infrastructure** - EF Core repositories - Concrete implementations -
External adapters - Persistence configuration

**API** - REST Controllers - Middleware - Dependency Injection setup -
System entry point

------------------------------------------------------------------------

## 🔁 Dependency Rule

-   Domain depends on nothing\
-   Application depends only on Domain\
-   Infrastructure depends on Application and Domain\
-   API depends on Application and Infrastructure

------------------------------------------------------------------------

## 🛠️ Tech Stack

**Backend** - .NET - Entity Framework Core - SQL Server - REST API

**Architecture** - Clean Architecture - Hexagonal Architecture

------------------------------------------------------------------------

## 🌿 Branch Strategy

main → Production\
develop → Integration\
feature/back-\* → Backend features\
feature/front-\* → Frontend features

Workflow:

feature → Pull Request → develop\
develop → Pull Request → main

------------------------------------------------------------------------

## ▶️ Run Locally

Requirements: - .NET SDK - SQL Server

Commands:

dotnet restore dotnet build dotnet run --project FitFlow.Api

Connection string configuration:

FitFlow.Api/appsettings.json

------------------------------------------------------------------------

## 📈 Scalability

-   Database engine can be swapped without affecting Domain
-   Ready for payment gateway integration
-   JWT authentication ready
-   Multi-branch scalability
-   Microservices-ready foundation

------------------------------------------------------------------------

## 📌 Project Status

MVP structured with enterprise-ready architecture principles.

------------------------------------------------------------------------

## 📄 License

Technical portfolio and architectural demonstration project.
