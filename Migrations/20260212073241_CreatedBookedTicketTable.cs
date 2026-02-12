using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AccelokaSandy.Migrations
{
    /// <inheritdoc />
    public partial class CreatedBookedTicketTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BookedTicket",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    BookedTicketCode = table.Column<string>(type: "text", nullable: false),
                    TicketId = table.Column<string>(type: "text", nullable: false),
                    Quantity = table.Column<int>(type: "integer", nullable: false),
                    BookedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BookedTicket", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BookedTicket_Tickets_TicketId",
                        column: x => x.TicketId,
                        principalTable: "Tickets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BookedTicket_BookedTicketCode",
                table: "BookedTicket",
                column: "BookedTicketCode",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_BookedTicket_TicketId",
                table: "BookedTicket",
                column: "TicketId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BookedTicket");
        }
    }
}
