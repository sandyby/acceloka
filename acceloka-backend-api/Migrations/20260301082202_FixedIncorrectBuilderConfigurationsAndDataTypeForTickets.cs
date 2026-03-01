using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AccelokaSandy.Migrations
{
    /// <inheritdoc />
    public partial class FixedIncorrectBuilderConfigurationsAndDataTypeForTickets : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EventDate",
                table: "Tickets");

            migrationBuilder.AddColumn<string>(
                name: "Airline",
                table: "Tickets",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<List<string>>(
                name: "Amenities",
                table: "Tickets",
                type: "text[]",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ArrivalAirport",
                table: "Tickets",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "BaggageKg",
                table: "Tickets",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CategoryName",
                table: "Tickets",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "DepartureAirport",
                table: "Tickets",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DepartureTime",
                table: "Tickets",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<TimeSpan>(
                name: "Duration",
                table: "Tickets",
                type: "interval",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SeatClass",
                table: "Tickets",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TicketType",
                table: "Tickets",
                type: "character varying(13)",
                maxLength: 13,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "TransitsCount",
                table: "Tickets",
                type: "integer",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Airline",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "Amenities",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "ArrivalAirport",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "BaggageKg",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "CategoryName",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "DepartureAirport",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "DepartureTime",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "Duration",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "SeatClass",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "TicketType",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "TransitsCount",
                table: "Tickets");

            migrationBuilder.AddColumn<DateTime>(
                name: "EventDate",
                table: "Tickets",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
