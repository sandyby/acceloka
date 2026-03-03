using AccelokaSandy.Application.Features.Tickets.CreateTicket;
using AccelokaSandy.Application.Features.Tickets.GetAvailableTickets;
using AccelokaSandy.Application.Features.Tickets.GetTicketByCode;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Diagnostics;

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

    [HttpGet("get-ticket-metadata")]
    public async Task<IActionResult> GetTicketMetadata([FromQuery] GetTicketMetadataQuery query)
    {
        var result = await _sender.Send(query);
        return Ok(result);
    }

    [HttpGet("get-ticket-by-code/{TicketCode}")]
    public async Task<IActionResult> GetTicketByCode(string TicketCode)
    {
        var ticket = await _sender.Send(new GetTicketByCodeQuery(TicketCode));
        return Ok(ticket);
    }

    [HttpPost("create-ticket/flight")]
    public async Task<IActionResult> CreateFlightTicket([FromBody] CreateFlightTicketCommand body)
    {
        if (body == null)
        {
            return BadRequest("The request body is required!");
        }

        var flightTicket = await _sender.Send(new CreateFlightTicketCommand(
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
        return CreatedAtAction(nameof(GetTicketByCode), new { TicketCode = flightTicket.TicketCode }, flightTicket);
    }

    [HttpPost("create-ticket/hotel")]
    public async Task<IActionResult> CreateHotelTicket([FromBody] CreateHotelTicketCommand body)
    {
        if (body == null)
        {
            return BadRequest("The request body is required!");
        }

        var hotelTicket = await _sender.Send(new CreateHotelTicketCommand(
            TicketCode: body.TicketCode,
            TicketCategoryName: body.TicketCategoryName,
            TicketCategoryId: body.TicketCategoryId,
            TicketName: body.TicketName,
            Quota: body.Quota,
            Price: body.Price,
            HotelName: body.HotelName,
            RoomType: body.RoomType,
            MinCheckInDate: body.MinCheckInDate,
            MaxCheckOutDate: body.MaxCheckOutDate,
            MaxOccupancy: body.MaxOccupancy,
            Amenities: body.Amenities
        ));
        return CreatedAtAction(nameof(GetTicketByCode), new { TicketCode = hotelTicket.TicketCode }, hotelTicket);
    }

    [HttpPost("create-ticket/concert")]
    public async Task<IActionResult> CreateConcertTicket([FromBody] CreateConcertTicketCommand body)
    {
        if (body == null)
        {
            return BadRequest("The request body is required!");
        }

        var concertTicket = await _sender.Send(new CreateConcertTicketCommand(
            TicketCode: body.TicketCode,
            TicketCategoryName: body.TicketCategoryName,
            TicketCategoryId: body.TicketCategoryId,
            TicketName: body.TicketName,
            Quota: body.Quota,
            Price: body.Price,
            Venue: body.Venue,
            Artist: body.Artist,
            SeatSection: body.SeatSection,
            ConcertDate: body.ConcertDate,
            Duration: body.Duration,
            Packages: body.Packages
        ));
        return CreatedAtAction(nameof(GetTicketByCode), new { TicketCode = concertTicket.TicketCode }, concertTicket);
    }

    [HttpPost("create-ticket/movie")]
    public async Task<IActionResult> CreateMovieTicket([FromBody] CreateMovieTicketCommand body)
    {
        if (body == null)
        {
            return BadRequest("The request body is required!");
        }

        var movieTicket = await _sender.Send(new CreateMovieTicketCommand(
            TicketCode: body.TicketCode,
            TicketCategoryName: body.TicketCategoryName,
            TicketCategoryId: body.TicketCategoryId,
            TicketName: body.TicketName,
            Quota: body.Quota,
            Price: body.Price,
            Cinema: body.Cinema,
            CinemaType: body.CinemaType,
            SeatSection: body.SeatSection,
            ScreeningTime: body.ScreeningTime,
            Duration: body.Duration
        ));
        return CreatedAtAction(nameof(GetTicketByCode), new { TicketCode = movieTicket.TicketCode }, movieTicket);
    }

    [HttpPost("create-ticket/train")]
    public async Task<IActionResult> CreateTrainTicket([FromBody] CreateTrainTicketCommand body)
    {
        if (body == null)
        {
            return BadRequest("The request body is required!");
        }

        var trainTicket = await _sender.Send(new CreateTrainTicketCommand(
            TicketCode: body.TicketCode,
            TicketCategoryName: body.TicketCategoryName,
            TicketCategoryId: body.TicketCategoryId,
            TicketName: body.TicketName,
            Quota: body.Quota,
            Price: body.Price,
            TrainCode: body.TrainCode,
            TrainType: body.TrainType,
            SeatClass: body.SeatClass,
            DepartureStation: body.DepartureStation,
            ArrivalStation: body.ArrivalStation,
            DepartureTime: body.DepartureTime,
            Duration: body.Duration,
            TransitsCount: body.TransitsCount,
            Amenities: body.Amenities
        ));
        return CreatedAtAction(nameof(GetTicketByCode), new { TicketCode = trainTicket.TicketCode }, trainTicket);
    }

    [HttpPost("create-ticket/bus")]
    public async Task<IActionResult> CreateSeaTransportationTicket([FromBody] CreateBusTicketCommand body)
    {
        if (body == null)
        {
            return BadRequest("The request body is required!");
        }

        var busTicket = await _sender.Send(new CreateBusTicketCommand(
            TicketCode: body.TicketCode,
            TicketCategoryName: body.TicketCategoryName,
            TicketCategoryId: body.TicketCategoryId,
            TicketName: body.TicketName,
            Quota: body.Quota,
            Price: body.Price,
            BusCode: body.BusCode,
            BusType: body.BusType,
            SeatClass: body.SeatClass,
            DepartureStop: body.DepartureStop,
            ArrivalStop: body.ArrivalStop,
            DepartureTime: body.DepartureTime,
            Duration: body.Duration,
            TransitsCount: body.TransitsCount,
            Amenities: body.Amenities
        ));
        return CreatedAtAction(nameof(GetTicketByCode), new { TicketCode = busTicket.TicketCode }, busTicket);
    }

    [HttpPost("create-ticket/sea-transportation")]
    public async Task<IActionResult> CreateSeaTransportationTicket([FromBody] CreateSeaTransportationTicketCommand body)
    {
        if (body == null)
        {
            return BadRequest("The request body is required!");
        }

        var seaTransportationTicket = await _sender.Send(new CreateSeaTransportationTicketCommand(
            TicketCode: body.TicketCode,
            TicketCategoryName: body.TicketCategoryName,
            TicketCategoryId: body.TicketCategoryId,
            TicketName: body.TicketName,
            Quota: body.Quota,
            Price: body.Price,
            TransportationType: body.TransportationType,
            Company: body.Company,
            SeatClass: body.SeatClass,
            DeparturePort: body.DeparturePort,
            ArrivalPort: body.ArrivalPort,
            DepartureTime: body.DepartureTime,
            Duration: body.Duration,
            TransitsCount: body.TransitsCount,
            Amenities: body.Amenities
        ));
        return CreatedAtAction(nameof(GetTicketByCode), new { TicketCode = seaTransportationTicket.TicketCode }, seaTransportationTicket);
    }
}