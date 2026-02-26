export default async function TicketsPage() {
    const res = await fetch('http://localhost:5015/api/v1/get-available-tickets', {
        cache: 'no-store'
    });

    if (!res.ok) {
        return (
            <div
                className="text-red-600 p-10"
            >
                <p>Failed to load available tickets..</p>
                <p>Please try again in a few moment!</p>
            </div>
        )
    }

    const tickets = await res.json();
    console.log(tickets);

    return (
        <div className="p-10">
            <h1 className="text-3xl font-bold mb-6">Available Tickets</h1>
            <p className="mb-4 text-gray-600">Total Tickets found: {tickets.totalTicketsCount}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tickets.availableTickets.map((ticket: any) => (
                    <div key={ticket.ticketCode} className="border p-4 rounded-lg shadow-sm hover:shadow-md transition">
                        <h2 className="text-xl font-semibold">{ticket.ticketName}</h2>
                        <p className="text-sm text-gray-500">{ticket.ticketCategoryName} - {ticket.ticketCode}</p>
                        <div className="mt-4 flex justify-between items-center">
                            <span className="font-bold text-green-600">Rp {ticket.price}</span>
                            <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                Quota: {ticket.quota}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}