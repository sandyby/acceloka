using AccelokaSandy.Application.Features.BookedTickets.BookTickets;
using AccelokaSandy.Application.Features.BookedTickets.GetBookedTicketByCode;
using AccelokaSandy.Application.Features.BookedTickets.GetBookedTickets;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace AccelokaSandy.Controllers;

[ApiController]
[Route("api/v1")]

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

    [HttpGet("get-booked-ticket-by-code/{bookedTicketCode}")]
    public async Task<IActionResult> GetBookedTicketByCode(string bookedTicketCode)
    {
        var bookedTicket = await _sender.Send(new GetBookedTicketByCodeQuery(bookedTicketCode));
        return Ok(bookedTicket);
    }

    [HttpPost("book-tickets")]
    public async Task<IActionResult> BookTickets([FromQuery] BookTicketCommand cmd)
    {
        var bookedTickets = await _sender.Send(cmd);
        return Ok(bookedTickets);
    }
}