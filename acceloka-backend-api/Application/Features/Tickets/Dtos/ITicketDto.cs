namespace AccelokaSandy.Application.Features.Tickets.Dtos;

public interface ITicketDto
{
    string TicketCode { get; set; }
    string TicketName { get; set; }
    public string TicketCategory { get; set; }
    public int Quota { get; set; }
    int Price { get; set; }
}