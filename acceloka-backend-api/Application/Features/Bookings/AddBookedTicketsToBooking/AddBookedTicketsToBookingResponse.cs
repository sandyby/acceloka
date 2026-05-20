public class AddBookedTicketsToBookingResponse
{
    public string BookingId { get; set; } = null!;
    public string BookedTicketId { get; set; } = null!;
    public int Quantity { get; set; }
    public int TotalPrice { get; set; }
    public DateTime CreatedAt { get; set; }
}