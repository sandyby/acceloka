using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AccelokaSandy.Migrations
{
    /// <inheritdoc />
    public partial class UpdatedBookedTicketTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BookedTicket_Tickets_TicketId",
                table: "BookedTicket");

            migrationBuilder.DropPrimaryKey(
                name: "PK_BookedTicket",
                table: "BookedTicket");

            migrationBuilder.RenameTable(
                name: "BookedTicket",
                newName: "BookedTickets");

            migrationBuilder.RenameIndex(
                name: "IX_BookedTicket_TicketId",
                table: "BookedTickets",
                newName: "IX_BookedTickets_TicketId");

            migrationBuilder.RenameIndex(
                name: "IX_BookedTicket_BookedTicketCode",
                table: "BookedTickets",
                newName: "IX_BookedTickets_BookedTicketCode");

            migrationBuilder.AddPrimaryKey(
                name: "PK_BookedTickets",
                table: "BookedTickets",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_BookedTickets_Tickets_TicketId",
                table: "BookedTickets",
                column: "TicketId",
                principalTable: "Tickets",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BookedTickets_Tickets_TicketId",
                table: "BookedTickets");

            migrationBuilder.DropPrimaryKey(
                name: "PK_BookedTickets",
                table: "BookedTickets");

            migrationBuilder.RenameTable(
                name: "BookedTickets",
                newName: "BookedTicket");

            migrationBuilder.RenameIndex(
                name: "IX_BookedTickets_TicketId",
                table: "BookedTicket",
                newName: "IX_BookedTicket_TicketId");

            migrationBuilder.RenameIndex(
                name: "IX_BookedTickets_BookedTicketCode",
                table: "BookedTicket",
                newName: "IX_BookedTicket_BookedTicketCode");

            migrationBuilder.AddPrimaryKey(
                name: "PK_BookedTicket",
                table: "BookedTicket",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_BookedTicket_Tickets_TicketId",
                table: "BookedTicket",
                column: "TicketId",
                principalTable: "Tickets",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
