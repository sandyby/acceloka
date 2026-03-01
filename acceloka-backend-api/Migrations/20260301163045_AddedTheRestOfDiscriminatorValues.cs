using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AccelokaSandy.Migrations
{
    /// <inheritdoc />
    public partial class AddedTheRestOfDiscriminatorValues : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "TicketType",
                table: "Tickets",
                type: "character varying(21)",
                maxLength: 21,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(13)",
                oldMaxLength: 13);

            migrationBuilder.AddColumn<string>(
                name: "ArrivalPort",
                table: "Tickets",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ArrivalStation",
                table: "Tickets",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ArrivalStop",
                table: "Tickets",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Artist",
                table: "Tickets",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "BusCode",
                table: "Tickets",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<List<string>>(
                name: "BusTicket_Amenities",
                table: "Tickets",
                type: "text[]",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "BusTicket_DepartureTime",
                table: "Tickets",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<TimeSpan>(
                name: "BusTicket_Duration",
                table: "Tickets",
                type: "interval",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "BusTicket_SeatClass",
                table: "Tickets",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "BusTicket_TransitsCount",
                table: "Tickets",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "BusType",
                table: "Tickets",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Cinema",
                table: "Tickets",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CinemaType",
                table: "Tickets",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Company",
                table: "Tickets",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ConcertDate",
                table: "Tickets",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<TimeSpan>(
                name: "ConcertTicket_Duration",
                table: "Tickets",
                type: "interval",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ConcertTicket_SeatSection",
                table: "Tickets",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeparturePort",
                table: "Tickets",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DepartureStation",
                table: "Tickets",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DepartureStop",
                table: "Tickets",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "FlightTicket_DepartureTime",
                table: "Tickets",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<TimeSpan>(
                name: "FlightTicket_Duration",
                table: "Tickets",
                type: "interval",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FlightTicket_SeatClass",
                table: "Tickets",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "FlightTicket_TransitsCount",
                table: "Tickets",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<List<string>>(
                name: "HotelTicket_Amenities",
                table: "Tickets",
                type: "text[]",
                nullable: true);

            migrationBuilder.AddColumn<TimeSpan>(
                name: "MovieTicket_Duration",
                table: "Tickets",
                type: "interval",
                nullable: true);

            migrationBuilder.AddColumn<List<string>>(
                name: "Packages",
                table: "Tickets",
                type: "text[]",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ScreeningTime",
                table: "Tickets",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SeatSection",
                table: "Tickets",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TrainCode",
                table: "Tickets",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<List<string>>(
                name: "TrainTicket_Amenities",
                table: "Tickets",
                type: "text[]",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "TrainTicket_DepartureTime",
                table: "Tickets",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<TimeSpan>(
                name: "TrainTicket_Duration",
                table: "Tickets",
                type: "interval",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TrainTicket_SeatClass",
                table: "Tickets",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TrainTicket_TransitsCount",
                table: "Tickets",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TrainType",
                table: "Tickets",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TransportationType",
                table: "Tickets",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Venue",
                table: "Tickets",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ArrivalPort",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "ArrivalStation",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "ArrivalStop",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "Artist",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "BusCode",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "BusTicket_Amenities",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "BusTicket_DepartureTime",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "BusTicket_Duration",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "BusTicket_SeatClass",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "BusTicket_TransitsCount",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "BusType",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "Cinema",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "CinemaType",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "Company",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "ConcertDate",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "ConcertTicket_Duration",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "ConcertTicket_SeatSection",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "DeparturePort",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "DepartureStation",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "DepartureStop",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "FlightTicket_DepartureTime",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "FlightTicket_Duration",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "FlightTicket_SeatClass",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "FlightTicket_TransitsCount",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "HotelTicket_Amenities",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "MovieTicket_Duration",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "Packages",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "ScreeningTime",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "SeatSection",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "TrainCode",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "TrainTicket_Amenities",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "TrainTicket_DepartureTime",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "TrainTicket_Duration",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "TrainTicket_SeatClass",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "TrainTicket_TransitsCount",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "TrainType",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "TransportationType",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "Venue",
                table: "Tickets");

            migrationBuilder.AlterColumn<string>(
                name: "TicketType",
                table: "Tickets",
                type: "character varying(13)",
                maxLength: 13,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(21)",
                oldMaxLength: 21);
        }
    }
}
