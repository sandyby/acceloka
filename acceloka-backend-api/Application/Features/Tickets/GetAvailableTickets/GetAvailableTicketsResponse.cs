using AccelokaSandy.Application.Features.Tickets.Dtos;

public class GetAvailableTicketsResponse
{
    public List<ITicketDto> AvailableTickets { get; set; } = new ();
    public int TotalTicketsCount { get; set; }
    public int CurrentPage { get; set; }
    public int PageSize { get; set; }
}