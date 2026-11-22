using FluentValidation;
using Microsoft.AspNetCore.Http;

namespace Api.Common.Filters;

public sealed class ValidationFilter<T> : IEndpointFilter
where T : notnull
{
    private readonly IValidator<T> _validator;

    public ValidationFilter(IValidator<T> validator)
    {
        _validator = validator;
    }

    public async ValueTask<object> InvokeAsync(
    EndpointFilterInvocationContext context,
    EndpointFilterDelegate next)
    {
        var argument = context.Arguments
        .OfType<T>()
        .FirstOrDefault();

        if (argument is null)
            return await next(context);

        var validationContext = new
            ValidationContext<T>(argument);

        var validationResult = await _validator.ValidateAsync(validationContext,
            context.HttpContext.RequestAborted);

        if (!validationResult.IsValid)
        {
            var errors = validationResult.Errors
            .GroupBy(error => error.PropertyName)
            .ToDictionary(
            group => group.Key,
            group => group.Select(error => error.ErrorMessage).ToArray());

            return Results.ValidationProblem(errors);
        }

        return await next(context);
    }
}