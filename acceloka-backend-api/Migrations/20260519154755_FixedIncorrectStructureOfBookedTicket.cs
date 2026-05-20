using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AccelokaSandy.Migrations
{
    /// <inheritdoc />
    public partial class FixedIncorrectStructureOfBookedTicket : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BookedTickets_Bookings_BookingId1",
                table: "BookedTickets");

            migrationBuilder.DropIndex(
                name: "IX_BookedTickets_BookedTicketCode",
                table: "BookedTickets");

            migrationBuilder.DropIndex(
                name: "IX_BookedTickets_BookingId1",
                table: "BookedTickets");

            migrationBuilder.DropColumn(
                name: "TotalPrice",
                table: "Bookings");

            migrationBuilder.DropColumn(
                name: "BookedTicketCode",
                table: "BookedTickets");

            migrationBuilder.DropColumn(
                name: "BookingId1",
                table: "BookedTickets");

            migrationBuilder.DropColumn(
                name: "OriginalPrice",
                table: "BookedTickets");

            migrationBuilder.RenameColumn(
                name: "SnapshotTotalPrice",
                table: "BookedTickets",
                newName: "SnapshotUnitPrice");

            migrationBuilder.CreateIndex(
                name: "IX_BookedTickets_Id",
                table: "BookedTickets",
                column: "Id",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_BookedTickets_Id",
                table: "BookedTickets");

            migrationBuilder.RenameColumn(
                name: "SnapshotUnitPrice",
                table: "BookedTickets",
                newName: "SnapshotTotalPrice");

            migrationBuilder.AddColumn<int>(
                name: "TotalPrice",
                table: "Bookings",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "BookedTicketCode",
                table: "BookedTickets",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "BookingId1",
                table: "BookedTickets",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "OriginalPrice",
                table: "BookedTickets",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_BookedTickets_BookedTicketCode",
                table: "BookedTickets",
                column: "BookedTicketCode",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_BookedTickets_BookingId1",
                table: "BookedTickets",
                column: "BookingId1");

            migrationBuilder.AddForeignKey(
                name: "FK_BookedTickets_Bookings_BookingId1",
                table: "BookedTickets",
                column: "BookingId1",
                principalTable: "Bookings",
                principalColumn: "Id");
        }
    }
}
