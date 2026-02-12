using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AccelokaSandy.Migrations
{
    /// <inheritdoc />
    public partial class UpdatedBookedTicketPrimaryKeyToCompositePK : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_BookedTickets",
                table: "BookedTickets");

            migrationBuilder.AddPrimaryKey(
                name: "PK_BookedTickets",
                table: "BookedTickets",
                columns: new[] { "Id", "BookedTicketCode" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_BookedTickets",
                table: "BookedTickets");

            migrationBuilder.AddPrimaryKey(
                name: "PK_BookedTickets",
                table: "BookedTickets",
                column: "Id");
        }
    }
}
