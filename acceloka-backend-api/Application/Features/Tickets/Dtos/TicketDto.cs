namespace AccelokaSandy.Application.Features.Tickets.Dtos;

public abstract class TicketDto : ITicketDto
{
    public required string TicketCode { get; set; }
    public required string TicketName { get; set; }
    public required string TicketCategory { get; set; }
    public int Quota { get; set; }
    public int Price { get; set; }
}