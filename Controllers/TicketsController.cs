using AccelokaSandy.Application.Features.Categories.CreateCategory;
using AccelokaSandy.Application.Features.Categories.GetAllCategories;
using AccelokaSandy.Application.Features.Tickets.CreateTicket;
using AccelokaSandy.Application.Features.Tickets.GetAvailableTickets;
using AccelokaSandy.Application.Features.Tickets.GetCategoryById;
using AccelokaSandy.Application.Features.Tickets.GetTicketByCode;
using AccelokaSandy.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace AccelokaSandy.Controllers;

[ApiController]
[Route("api/v1")]
public class TicketsController : ControllerBase
{
    private readonly ISender _sender;
    public TicketsController(ISender mediator)
    {
        this._sender = mediator;
    }

    [HttpGet("get-available-tickets")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(GetAvailableTicketsResponse))]
    [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ProblemDetails))]
    public async Task<IActionResult> GetAvailableTickets(
        [FromQuery] GetAvailableTicketsQuery query
    )
    {
        var tickets = await _sender.Send(query);
        return Ok(tickets);
    }

    [HttpGet("get-ticket-by-code/{TicketCode}")]
    public async Task<IActionResult> GetTicketByCode(string TicketCode)
    {
        var ticket = await _sender.Send(new GetTicketByCodeQuery(TicketCode));
        return Ok(ticket);
    }

    [HttpPost("create-ticket")]
    public async Task<IActionResult> CreateTicket([FromBody] CreateTicketCommand cmd)
    {
        var ticket = await _sender.Send(cmd);
        return CreatedAtAction(nameof(GetTicketByCode), new { ticketCode = ticket.TicketCode }, ticket);
    }
}