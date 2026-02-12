using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AccelokaSandy.Migrations
{
    /// <inheritdoc />
    public partial class RemovedUniqueIndexFromBookedTicketCode : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_BookedTickets_BookedTicketCode",
                table: "BookedTickets");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_BookedTickets_BookedTicketCode",
                table: "BookedTickets",
                column: "BookedTicketCode",
                unique: true);
        }
    }
}
