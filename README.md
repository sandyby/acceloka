NuGet Packages used:
====================

- AutoMapper.Extensions.Microsoft.DependencyInjection Version="12.0.1"
- FluentValidation Version="12.1.1"
- FluentValidation.AspNetCore Version="11.3.1"
- FFluentValidation.DependencyInjectionExtensions Version="12.1.1"
- MediatR Version="14.0.0"
- Microsoft.AspNetCore.Mvc.Versioning Version="5.1.0"
- Microsoft.AspNetCore.OpenApi Version="10.0.2"
- Microsoft.EntityFrameworkCore.Design Version="10.0.2"
- Npgsql.EntityFrameworkCore.PostgreSQL Version="10.0.0"
- Serilog.AspNetCore Version="10.0.0" />
- Serilog.Sinks.File Version="7.0.0" />
- Swashbuckle.AspNetCore Version="10.1.2"

Notes
=====

Swagger UI is used to help testing the API endpoints easier:
--> Should be accessible on Development environment only at localhost:[your_port]/swagger/index.html),
--> as for Production environment, it will not have Swagger UI, but you can test via the .http file, Postman, directly via URIs or anything that might be able to help you.

Unfortunately, I haven't prepared the seeder for populating the database.

As for the request responses, you might notice that some properties or key-value pairs are different in the JSON body,
but it is similar and I've adjusted it accordingly to the requirements, the additional values are only to help debugging and documentation purposes on the development.

All the standards and best practices hopefully are implemented already, I've tried my best on exploring and using the CQRS & Mediator design pattern combined with
FluentValidation and Custom Exceptions & Global Exceptions Handling, as well as applying standardized RFC 7807, RFC 9110, RFC 9457 or any that obsoletes the previous ones.

The database used is PostgreSQL, ran locally via DBeaver

❤️
