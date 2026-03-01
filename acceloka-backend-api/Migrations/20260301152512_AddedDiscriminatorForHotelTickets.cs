using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AccelokaSandy.Migrations
{
    /// <inheritdoc />
    public partial class AddedDiscriminatorForHotelTickets : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<List<string>>(
                name: "FlightTicket_Amenities",
                table: "Tickets",
                type: "text[]",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "HotelName",
                table: "Tickets",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "MaxCheckOutDate",
                table: "Tickets",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "MaxOccupancy",
                table: "Tickets",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "MinCheckInDate",
                table: "Tickets",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "RoomType",
                table: "Tickets",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FlightTicket_Amenities",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "HotelName",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "MaxCheckOutDate",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "MaxOccupancy",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "MinCheckInDate",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "RoomType",
                table: "Tickets");
        }
    }
}
