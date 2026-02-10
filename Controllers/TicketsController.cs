using AccelokaSandy.Domain.Entities;
using AccelokaSandy.Requests.Tickets;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace AccelokaSandy.Controllers;

[ApiController]
[Route("api/v1/tickets")]
public class TicketsControlelr: ControllerBase
{
    private readonly IMediator _mediator;
    public TicketsControlelr(IMediator mediator)
    {
        this._mediator = mediator;
    }

    [HttpGet]
    public async Task<IActionResult> GetTickets()
    {
        var tickets = await _mediator.Send(new GetTicketsQuery());
        return tickets is null ? NotFound() : Ok(tickets);
    }
}