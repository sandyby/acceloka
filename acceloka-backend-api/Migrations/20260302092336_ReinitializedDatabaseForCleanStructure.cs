using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AccelokaSandy.Migrations
{
    /// <inheritdoc />
    public partial class ReinitializedDatabaseForCleanStructure : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Bookings",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    UserId = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    TotalPrice = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Bookings", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TicketCategories",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    TicketCategoryName = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TicketCategories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Tickets",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    TicketCode = table.Column<string>(type: "text", nullable: false),
                    TicketName = table.Column<string>(type: "text", nullable: false),
                    Quota = table.Column<int>(type: "integer", nullable: false),
                    Price = table.Column<int>(type: "integer", nullable: false),
                    CategoryId = table.Column<string>(type: "text", nullable: false),
                    Amenities = table.Column<string>(type: "jsonb", nullable: true),
                    DepartureTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Duration = table.Column<TimeSpan>(type: "interval", nullable: true),
                    SeatClass = table.Column<string>(type: "text", nullable: true),
                    TransitsCount = table.Column<int>(type: "integer", nullable: true),
                    BaggageKg = table.Column<int>(type: "integer", nullable: true),
                    TicketType = table.Column<string>(type: "character varying(21)", maxLength: 21, nullable: false),
                    BusCode = table.Column<string>(type: "text", nullable: true),
                    BusType = table.Column<string>(type: "text", nullable: true),
                    DepartureStop = table.Column<string>(type: "text", nullable: true),
                    ArrivalStop = table.Column<string>(type: "text", nullable: true),
                    Venue = table.Column<string>(type: "text", nullable: true),
                    Artist = table.Column<string>(type: "text", nullable: true),
                    ConcertTicket_SeatSection = table.Column<string>(type: "text", nullable: true),
                    ConcertDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Packages = table.Column<List<string>>(type: "text[]", nullable: true),
                    Airline = table.Column<string>(type: "text", nullable: true),
                    DepartureAirport = table.Column<string>(type: "text", nullable: true),
                    ArrivalAirport = table.Column<string>(type: "text", nullable: true),
                    HotelName = table.Column<string>(type: "text", nullable: true),
                    RoomType = table.Column<string>(type: "text", nullable: true),
                    MinCheckInDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    MaxCheckOutDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    MaxOccupancy = table.Column<int>(type: "integer", nullable: true),
                    Cinema = table.Column<string>(type: "text", nullable: true),
                    CinemaType = table.Column<string>(type: "text", nullable: true),
                    SeatSection = table.Column<string>(type: "text", nullable: true),
                    ScreeningTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    TransportationType = table.Column<string>(type: "text", nullable: true),
                    Company = table.Column<string>(type: "text", nullable: true),
                    DeparturePort = table.Column<string>(type: "text", nullable: true),
                    ArrivalPort = table.Column<string>(type: "text", nullable: true),
                    TrainCode = table.Column<string>(type: "text", nullable: true),
                    TrainType = table.Column<string>(type: "text", nullable: true),
                    DepartureStation = table.Column<string>(type: "text", nullable: true),
                    ArrivalStation = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tickets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Tickets_TicketCategories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "TicketCategories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "BookedTickets",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    BookedTicketCode = table.Column<string>(type: "text", nullable: false),
                    TicketId = table.Column<string>(type: "text", nullable: false),
                    BookingId = table.Column<string>(type: "text", nullable: false),
                    Quantity = table.Column<int>(type: "integer", nullable: false),
                    SnapshotTotalPrice = table.Column<int>(type: "integer", nullable: false),
                    OriginalPrice = table.Column<int>(type: "integer", nullable: false),
                    BookingId1 = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BookedTickets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BookedTickets_Bookings_BookingId",
                        column: x => x.BookingId,
                        principalTable: "Bookings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BookedTickets_Bookings_BookingId1",
                        column: x => x.BookingId1,
                        principalTable: "Bookings",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_BookedTickets_Tickets_TicketId",
                        column: x => x.TicketId,
                        principalTable: "Tickets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BookedTickets_BookedTicketCode",
                table: "BookedTickets",
                column: "BookedTicketCode",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_BookedTickets_BookingId",
                table: "BookedTickets",
                column: "BookingId");

            migrationBuilder.CreateIndex(
                name: "IX_BookedTickets_BookingId1",
                table: "BookedTickets",
                column: "BookingId1");

            migrationBuilder.CreateIndex(
                name: "IX_BookedTickets_TicketId",
                table: "BookedTickets",
                column: "TicketId");

            migrationBuilder.CreateIndex(
                name: "IX_Bookings_UserId",
                table: "Bookings",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_TicketCategories_TicketCategoryName",
                table: "TicketCategories",
                column: "TicketCategoryName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Tickets_CategoryId",
                table: "Tickets",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Tickets_TicketCode",
                table: "Tickets",
                column: "TicketCode",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BookedTickets");

            migrationBuilder.DropTable(
                name: "Bookings");

            migrationBuilder.DropTable(
                name: "Tickets");

            migrationBuilder.DropTable(
                name: "TicketCategories");
        }
    }
}
