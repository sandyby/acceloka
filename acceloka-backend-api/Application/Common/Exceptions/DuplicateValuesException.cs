namespace AccelokaSandy.Application.Common.Exceptions;

public class DuplicateValuesException : Exception
{
    public DuplicateValuesException(string message) : base(message) { }
}