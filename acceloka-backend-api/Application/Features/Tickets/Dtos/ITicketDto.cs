namespace AccelokaSandy.Application.Features.Tickets.Dtos;

public interface ITicketDto
{
    string TicketName { get; set; }
    string TicketCode { get; set; }
    int Price { get; set; }
}