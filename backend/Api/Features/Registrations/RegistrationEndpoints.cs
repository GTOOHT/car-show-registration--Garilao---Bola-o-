using Api.Common.Filters;
using Application.Features.Registrations.CreateRegistration;
using Application.Features.Registrations.GetRegistrationById;
using Application.Features.Registrations.GetRegistrations;
using Application.Features.Registrations.GetRegistrationSummary;
using FluentValidation;
using System.ComponentModel.DataAnnotations;

namespace Api.Features.Registrations;

public static class RegistrationEndpoints
{
    public static IEndpointRouteBuilder MapRegistrationEndpoints(
    this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/registrations")
        .WithTags("Registrations");

        // CREATE REGISTRATION
        group.MapPost("/", async (
        CreateRegistrationCommand command,
        CreateRegistrationHandler handler,
        CancellationToken cancellationToken) => {
            var result = await handler.HandleAsync(
    command, cancellationToken);

            if (!result.IsSuccess)
                return Results.Problem(
        title: result.Error!.Code,
        detail: result.Error.Message,
        statusCode: result.Error.Code.Contains("Conflict")
        ? 409
        : 400);

            return Results.Created(
    $"/api/registrations/{result.Value!.Id}",
    result.Value);
        })
        .AddEndpointFilter <ValidationFilter<CreateRegistrationCommand>> ();

        // GET ALL REGISTRATIONS
        group.MapGet("/", async (
        GetRegistrationsHandler handler,
        IValidator < GetRegistrationsQuery > validator,
        CancellationToken cancellationToken,
        string ? type = null,
        string? status = null,
        string? participantName = null,
        int page = 1,
        int pageSize = 10) => {
            var query = new GetRegistrationsQuery(
    type,
    status,
    participantName,
    page,
    pageSize);

            var validationResult = await validator.ValidateAsync(
    query, cancellationToken);

            if (!validationResult.IsValid)
            {
                var errors = validationResult.Errors
        .GroupBy(error => error.PropertyName)
        .ToDictionary(
        group => group.Key,
        group => group.Select(error => error.ErrorMessage).ToArray());

                return Results.ValidationProblem(errors);
            }

            var result = await handler.HandleAsync(
    query, cancellationToken);

            return result.IsSuccess
    ? Results.Ok(result.Value)
    : Results.Problem(
    title: result.Error!.Code,
    detail: result.Error.Message,
    statusCode: 400);
        });

        // GET REGISTRATION SUMMARY
        group.MapGet("/summary", async (
        GetRegistrationSummaryHandler handler,
        CancellationToken cancellationToken) => {
            var query = new GetRegistrationSummayQuery();

            var result = await handler.HandleAsync(
    query, cancellationToken);

            return result.IsSuccess
    ? Results.Ok(result.Value)
    : Results.Problem(
    title: result.Error!.Code,
    detail: result.Error.Message,
    statusCode: 400);
        });

        // GET REGISTRATION BY ID
        group.MapGet("/{id:guid}", async (
        Guid id,
        GetRegistrationByIdHandler handler,
        CancellationToken cancellationToken) => {
            var query = new GetRegistrationByIdQuery(id);

            var result = await handler.HandleAsync(
    query, cancellationToken);

            return result.IsSuccess
    ? Results.Ok(result.Value)
    : Results.Problem(
    title: result.Error!.Code,
    detail: result.Error.Message,
    statusCode: 404);
        });

        return app;
    }
}