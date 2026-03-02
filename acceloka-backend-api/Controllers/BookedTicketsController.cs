// using AccelokaSandy.Application.Features.BookedTickets.BookTickets;
// using AccelokaSandy.Application.Features.BookedTickets.GetBookedTicketById;
// using AccelokaSandy.Application.Features.BookedTickets.GetBookedTickets;
// using AccelokaSandy.Application.Features.BookedTickets.RevokeBookedTicket;
// using Application.Features.BookedTickets.EditBookedTicket;
// using MediatR;
// using Microsoft.AspNetCore.Mvc;

// namespace AccelokaSandy.Controllers;

// [ApiController]
// [Route("api/v1")]
// [ApiVersion("1.0")]
// public class BookedTicketsController : ControllerBase
// {
//     private readonly ISender _sender;
//     public BookedTicketsController(ISender sender)
//     {
//         this._sender = sender;
//     }

//     [HttpGet("get-booked-tickets")]
//     public async Task<IActionResult> GetBookedTickets([FromQuery] GetBookedTicketsQuery query)
//     {
//         var bookedTickets = await _sender.Send(query);
//         return Ok(bookedTickets);
//     }

//     [HttpGet("get-booked-ticket/{BookedTicketId}")]
//     public async Task<IActionResult> GetBookedTicket(string BookedTicketId)
//     {
//         var bookedTicketsById = await _sender.Send(new GetBookedTicketByIdQuery(BookedTicketId));
//         return Ok(bookedTicketsById);
//     }

//     [HttpPost("book-tickets")]
//     public async Task<IActionResult> BookTickets([FromBody] BookTicketsRequest body)
//     {
//         if (body == null || !body.BookedTickets.Any())
//         {
//             return BadRequest("The request body is required!");
//         }

//         var bookedTickets = await _sender.Send(new BookTicketsCommand(body.BookedTickets));
//         return Ok(bookedTickets);
//     }

//     [HttpPut("edit-booked-ticket/{BookedTicketId}")]
//     public async Task<IActionResult> EditBookedTicket(string BookedTicketId, [FromBody] EditBookedTicketRequest body)
//     {
//         if (body == null || !body.ToBeEditedBookedTickets.Any())
//         {
//             return BadRequest("The request body is required!");
//         }

//         var editedBookedTicket = await _sender.Send(new EditBookedTicketCommand(BookedTicketId, body.ToBeEditedBookedTickets));
//         return Ok(editedBookedTicket);
//     }

//     [HttpDelete("revoke-ticket/{BookedTicketId}/{BookedTicketCode}/{Quantity}")]
//     public async Task<IActionResult> RevokeBookedTicket(string BookedTicketId, string BookedTicketCode, int Quantity)
//     {
//         var revokedBookedTicket = await _sender.Send(new RevokeBookedTicketCommand(BookedTicketId, BookedTicketCode, Quantity));
//         return Ok(revokedBookedTicket);
//     }
// }

// // kalo sempet coba api versioning