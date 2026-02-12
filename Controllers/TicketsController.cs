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

    [HttpGet("get-all-categories")]
    public async Task<IActionResult> GetAllCategories()
    {
        var ticketCategories = await _sender.Send(new GetAllCategoriesQuery());
        return Ok(ticketCategories);
        // return ticketCategories is null ? NotFound() : Ok(ticketCategories);
    }

    [HttpGet("get-ticket-by-code/{ticketCode}")]
    public async Task<IActionResult> GetTicketByCode(string ticketCode)
    {
        var ticket = await _sender.Send(new GetTicketByCodeQuery(ticketCode));
        return Ok(ticket);
        // return ticket is null ? NotFound() : Ok(ticket);
    }

    [HttpGet("get-category-by-id/{id}")]
    public async Task<IActionResult> GetCategoryById(string id)
    {
        var ticketCategory = await _sender.Send(new GetCategoryByIdQuery(id));
        return Ok(ticketCategory);
        // return ticketCategory is null ? NotFound() : Ok(ticketCategory);
    }

    // [HttpPost("book-ticket")]
    // public async Task<IActionResult> BookTicket([FromQuery] BookTicketQuery query)
    // {
    //     var result = await _sender.Send(query);
    //     return CreatedAtAction(nameof(GetTicketByCode), new { ticketCode = ticket.TicketCode }, ticket);
    // }

    [HttpPost("create-ticket")]
    public async Task<IActionResult> CreateTicket([FromBody] CreateTicketCommand cmd)
    {
        var ticket = await _sender.Send(cmd);
        return CreatedAtAction(nameof(GetTicketByCode), new { ticketCode = ticket.TicketCode }, ticket);
    }

    [HttpPost("create-category")]
    public async Task<IActionResult> CreateTicketCategory([FromBody] CreateCategoryCommand cmd)
    {
        var ticketCategory = await _sender.Send(cmd);
        return CreatedAtAction(nameof(GetCategoryById), new { id = ticketCategory.Id }, ticketCategory);
    }
}