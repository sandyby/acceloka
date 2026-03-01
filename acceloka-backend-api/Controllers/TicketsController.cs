using AccelokaSandy.Application.Features.Tickets.CreateTicket;
using AccelokaSandy.Application.Features.Tickets.GetAvailableTickets;
using AccelokaSandy.Application.Features.Tickets.GetTicketByCode;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace AccelokaSandy.Controllers;

[ApiController]
[Route("api/v1")]
[ApiVersion("1.0")]
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

    [HttpPost("create-ticket/flights")]
    public async Task<IActionResult> CreateFlightTicket([FromBody] CreateFlightTicketCommand body)
    {
        if (body == null)
        {
            return BadRequest("The request body is required!");
        }

        var ticket = await _sender.Send(new CreateFlightTicketCommand(
            TicketCode: body.TicketCode,
            TicketCategoryName: body.TicketCategoryName,
            TicketCategoryId: body.TicketCategoryId,
            TicketName: body.TicketName,
            Quota: body.Quota,
            Price: body.Price,
            Airline: body.Airline,
            SeatClass: body.SeatClass,
            DepartureAirport: body.DepartureAirport,
            ArrivalAirport: body.ArrivalAirport,
            DepartureTime: body.DepartureTime,
            Duration: body.Duration,
            BaggageKg: body.BaggageKg,
            TransitsCount: body.TransitsCount,
            Amenities: body.Amenities
        ));
        return CreatedAtAction(nameof(GetTicketByCode), new { TicketCode = ticket.TicketCode }, ticket);
    }
}