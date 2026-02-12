using AccelokaSandy.Application.Features.BookedTickets.BookTickets;
using AccelokaSandy.Application.Features.BookedTickets.GetBookedTicketById;
using AccelokaSandy.Application.Features.BookedTickets.GetBookedTickets;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace AccelokaSandy.Controllers;

[ApiController]
[Route("api/v1")]
[ApiVersion("1.0")]
public class BookedTicketsController : ControllerBase
{
    private readonly ISender _sender;
    public BookedTicketsController(ISender sender)
    {
        this._sender = sender;
    }

    [HttpGet("get-booked-tickets")]
    public async Task<IActionResult> GetBookedTickets([FromQuery] GetBookedTicketsQuery query)
    {
        var bookedTickets = await _sender.Send(query);
        return Ok(bookedTickets);
    }

    [HttpGet("get-booked-ticket/{BookedTicketId}")]
    public async Task<IActionResult> GetBookedTicket(string BookedTicketId)
    {
        var bookedTicketsById = await _sender.Send(new GetBookedTicketByIdQuery(BookedTicketId));
        return Ok(bookedTicketsById);
    }

    [HttpPost("book-tickets")]
    public async Task<IActionResult> BookTickets([FromBody] BookTicketsCommand cmd)
    {
        var bookedTickets = await _sender.Send(cmd);
        return Ok(bookedTickets);
    }
}

// kalo sempet coba api versioning