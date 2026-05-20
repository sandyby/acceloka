using AccelokaSandy.Application.Features.Bookings.AddBookedTicketsToBooking;
using AccelokaSandy.Application.Features.Bookings.CreateBooking;
using AccelokaSandy.Application.Features.Bookings.GetBookingById;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace AccelokaSandy.Controllers;

[ApiController]
[Route("api/v1")]
[ApiVersion("1.0")]
public class BookingsController : ControllerBase
{
    private readonly ISender _sender;

    public BookingsController(ISender mediator)
    {
        this._sender = mediator;
    }

    [HttpGet("bookings/{BookingId}")]
    public async Task<IActionResult> GetBookingById(string BookingId)
    {
        var booking = await _sender.Send(new GetBookingByIdQuery(BookingId));
        return Ok(booking);
    }

    [HttpPost("bookings")]
    public async Task<IActionResult> CreateBooking()
    {
        var booking = await _sender.Send(new CreateBookingCommand());
        return Ok(booking);
    }

    [HttpPost("bookings/{BookingId}/tickets")]
    public async Task<IActionResult> AddBookedTicketsToBooking(
        string BookingId,
        [FromBody] AddBookedTicketsToBookingRequest body
    )
    {
        if (body == null || string.IsNullOrEmpty(BookingId))
        {
            return BadRequest("The request body and booking Id is required!");
        }
        var bookedTicket = await _sender.Send(
            new AddBookedTicketsToBookingCommand(BookingId, body)
        );
        return Ok(bookedTicket);
    }
}
