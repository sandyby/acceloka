using FluentValidation;
using MediatR;

namespace AccelokaSandy.Application.Common.Behaviors;

public class ValidationBehavior<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse> where TRequest : IRequest<TResponse>
{
    private readonly IEnumerable<IValidator<TRequest>> _validators;
    public ValidationBehavior(IEnumerable<IValidator<TRequest>> validators)
    {
        this._validators = validators;
    }
    public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken ct)
    {
        if (!_validators.Any())
        {
            return await next();
        }

        var context = new ValidationContext<TRequest>(request);
        var errors = _validators.Select(v => v.Validate(context)).SelectMany(v => v.Errors).Where(e => e is not null).ToList();

        if (errors.Any())
        {
            throw new ValidationException(errors);
        }

        return await next();
    }
}