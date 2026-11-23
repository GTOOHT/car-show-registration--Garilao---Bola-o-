Car Show Registration System — Backend

Project Overview

The Car Show Registration System is a backend API developed for the AutoVista Events Car Show 2027. It manages participant registrations, registration categories, payment information, and registration summaries.

Team Members

- Aivy C. Bolaño — Backend Developer
- Christian Erl Garilao — Frontend Developer

Technology Stack

- C#
- .NET 10
- ASP.NET Core Minimal API
- Entity Framework Core
- SQLite
- FluentValidation
- Scalar / OpenAPI
- Vertical Slice Architecture

Project Structure

backend/
├── Api/
│ ├── Common/
│ ├── Features/
│ ├── Api.http
│ └── Program.cs
├── Application/
│ ├── Abstractions/
│ └── Features/
├── Domain/
│ ├── Common/
│ └── Entities/
├── Infrastructure/
│ ├── Persistence/
│ └── DependencyInjection.cs
└── VerticalSlice.slnx

Requirements

Before running the backend, make sure you have:

- .NET 10 SDK
- Visual Studio or Visual Studio Code
- Git

How to Run the Backend

1. Open a terminal at the project repository root.

2. Navigate to the backend folder:

cd backend

3. Run the API:

dotnet run --project Api

4. Open Scalar in your browser:

"http://localhost:5205/scalar/v1"

The API uses SQLite for data persistence. Database migrations are applied during application startup, and the registration seeder provides initial sample records.

API Endpoints

Method| Endpoint| Description
POST| "/api/registrations"| Create a registration
GET| "/api/registrations"| Retrieve registrations with pagination and filters
GET| "/api/registrations/{id}"| Retrieve a registration by ID
GET| "/api/registrations/summary"| Retrieve registration and payment summaries

Registration Categories and Fees

Category| Registration Fee
Exhibitor| ₱1,500
Competitor| ₱2,500
VIP| ₱5,000

Registration fees are calculated by the backend based on the selected registration category.

Validation and Data Management

The backend uses FluentValidation to validate registration input. It also checks for duplicate plate numbers and uses SQLite unique indexes for registration numbers and plate numbers.

Registration payment status is computed based on the amount paid:

- Unpaid
- Partial
- Paid

The API uses appropriate HTTP response codes for successful requests, validation errors, missing records, and conflicts.

Testing

The API can be tested using Scalar at:

"http://localhost:5205/scalar/v1"

The "Api.http" file also contains sample HTTP requests for testing the registration endpoints.

Manual testing covered registration creation, validation, pagination, filtering, retrieving registrations, summary information, database persistence, and unique indexes.

Team Responsibilities

Backend Developer: Responsible for the C# API, domain entities, application features, database configuration, validation, and backend testing.

Frontend Developer: Responsible for the React frontend and connecting the user interface to the backend API.

Repository

GitHub: https://github.com/GTOOHT/car-show-registration--Garilao---Bola-o-.git