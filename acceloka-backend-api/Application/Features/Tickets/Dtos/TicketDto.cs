namespace AccelokaSandy.Application.Features.Tickets.Dtos;

public class TicketDto: ITicketDto
{
    public string TicketCategory { get; set; } = null!;
    public string TicketCode { get; set; } = null!;
    public string TicketName { get; set; } = null!;
    public int Quota { get; set; }
    public int Price { get; set; }
}