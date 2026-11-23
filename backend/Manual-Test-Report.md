Car Show Registration System — Backend Manual Test Report

1. Overview

This document summarizes the manual testing performed on the Car Show 2027 Registration System backend API.

Testing was conducted using Scalar and the available database inspection tools to check registration operations, input validation, filtering, summary information, database persistence, and unique constraints.

2. Testing Environment

- Project: Car Show Registration System
- Backend: C# / ASP.NET Core .NET 10
- Database: SQLite
- API Documentation and Testing: Scalar / OpenAPI
- Architecture: Vertical Slice Architecture

3. Manual Test Results

The following table summarizes the 40 manual test cases completed during backend testing.

Test Case| Feature / Functionality| Result
1–5| Registration creation and basic input handling| PASS
6–13| Registration validation and invalid input handling| PASS
14–19| Registration listing and pagination| PASS
20–28| Registration filtering| PASS
29–31| Retrieve registration by ID| PASS
32–38| Registration summary| PASS
39| Database persistence after API restart| PASS
40| Unique database indexes| PASS

Overall Result: 40 out of 40 test cases completed successfully.

4. Important Verification Results

Registration Creation

The POST registration endpoint was tested using valid and invalid registration information. Successful requests returned HTTP 201 Created, while invalid requests returned HTTP 400 Bad Request.

Duplicate Plate Number

Duplicate plate number submissions were tested. The API returned HTTP 409 Conflict when a duplicate was submitted.

Registration Listing and Filtering

The GET registrations endpoint was tested for pagination and filtering. Successful requests returned HTTP 200 OK.

Retrieve Registration by ID

The API was tested with existing and nonexistent registration IDs. Existing records returned HTTP 200 OK, while missing records returned HTTP 404 Not Found.

Registration Summary

The summary endpoint was tested to retrieve registration counts and payment-related totals.

Database Persistence

The API was restarted, and existing registration records were checked again. Previously saved records remained available after restarting the application.

Unique Database Indexes

The SQLite database schema was inspected to verify the unique indexes for registration numbers and plate numbers.

5. Conclusion

The manual testing process covered the main backend functionalities of the Car Show Registration System. The registration endpoints, validation, pagination, filtering, summary information, database persistence, and unique constraints were tested.

All 40 manual test cases were completed successfully based on the observed test results. These tests helped verify that the backend API performs its intended registration management operations.