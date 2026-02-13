using AccelokaSandy.Application.Common.Exceptions;
using FluentValidation;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

public class GlobalExceptionHandler : IExceptionHandler
{
    private readonly IProblemDetailsService _problemDetailsService;
    public GlobalExceptionHandler(IProblemDetailsService problemDetailsService)
    {
        this._problemDetailsService = problemDetailsService;
    }
    public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken ct)
    {
        /*
            dari rfc 7807 sendiri, disebutnya harus dicantumin URI di bagian 'type', entaitu ke IETF docs atau di API kita sendiri ada docs tersendiri

            kemudian juga, dari yg dibaca, rfc 7807 sudah cukup outdated dan memankebanyakan refer to rfc 9110 atau rfc 9457 (sepertinya)
        */

        ProblemDetails? problemDetails = exception switch
        {
            NotFoundException notFoundException => new ProblemDetails
            {
                Status = StatusCodes.Status404NotFound,
                Type = "https://tools.ietf.org/html/rfc9110#section-15.5.5",
                Title = "Value Not Found",
                Detail = notFoundException.Message,
                Instance = $"{httpContext.Request.Method} {httpContext.Request.Path}"
            },

            /*
                karena disable builder.Services.addfluetnvalidationautovalidation (sepertinya), makanya harus dicaught secara manual di sini untuk dibuat proper problem details
            */

            FluentValidation.ValidationException fluentValidationException => new ValidationProblemDetails
            {
                Status = StatusCodes.Status400BadRequest,
                Type = "https://tools.ietf.org/html/rfc9110#section-15.5.1",
                Title = "One or more validation errors occurred.",
                Instance = httpContext.Request.Path,
                Errors = fluentValidationException.Errors
                                .GroupBy(ex => ex.PropertyName ?? string.Empty)
                                .ToDictionary(
                                    g => string.IsNullOrEmpty(g.Key) ? "General" : g.Key,
                                    g => g.Select(err => err.ErrorMessage).Distinct().ToArray()
                                )
            },

            _ => null
        };

        if (problemDetails is not null)
        {
            httpContext.Response.ContentType = "application/problem+json";
            httpContext.Response.StatusCode = problemDetails.Status ?? StatusCodes.Status500InternalServerError;

            var context = new ProblemDetailsContext
            {
                HttpContext = httpContext,
                ProblemDetails = problemDetails,
                Exception = exception
            };

            await _problemDetailsService.WriteAsync(context);
            return true;
        }

        return false;
    }
}