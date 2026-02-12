using AccelokaSandy.Application.Features.Categories.CreateCategory;
using AccelokaSandy.Application.Features.Categories.GetAllCategories;
using AccelokaSandy.Application.Features.Tickets.GetCategoryById;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace AccelokaSandy.Controllers;

[ApiController]
[Route("api/v1")]

public class CategoriesController : ControllerBase
{
    private readonly ISender _sender;
    public CategoriesController(ISender mediator)
    {
        this._sender = mediator;
    }

    [HttpGet("get-all-categories")]
    public async Task<IActionResult> GetAllCategories()
    {
        var ticketCategories = await _sender.Send(new GetAllCategoriesQuery());
        return Ok(ticketCategories);
    }

    [HttpGet("get-category-by-id/{TicketCategoryId}")]
    public async Task<IActionResult> GetCategoryById(string TicketCategoryId)
    {
        var ticketCategory = await _sender.Send(new GetCategoryByIdQuery(TicketCategoryId));
        return Ok(ticketCategory);
    }


    [HttpPost("create-category")]
    public async Task<IActionResult> CreateTicketCategory([FromBody] CreateCategoryCommand cmd)
    {
        var ticketCategory = await _sender.Send(cmd);
        return CreatedAtAction(nameof(GetCategoryById), new { id = ticketCategory.Id }, ticketCategory);
    }
}