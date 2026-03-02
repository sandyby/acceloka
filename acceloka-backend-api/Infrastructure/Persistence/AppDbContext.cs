using AccelokaSandy.Domain.Entities.Tickets;
using AccelokaSandy.Domain.Entities.Categories;
using AccelokaSandy.Domain.Entities.Bookings;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace AccelokaSandy.Infrastructure.Persistence;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions options) : base(options)
    {
        //
    }

    public DbSet<TicketBase> Tickets { get; set; }
    public DbSet<TicketCategory> TicketCategories { get; set; }
    public DbSet<Booking> Bookings { get; set; }
    public DbSet<BookedTicket> BookedTickets { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // tickets
        modelBuilder.Entity<TicketBase>(builder =>
        {
            builder.ToTable("Tickets");

            builder.HasKey(t => t.Id);
            builder.Property(t => t.Id).ValueGeneratedNever();
            builder.HasIndex(t => t.TicketCode).IsUnique();
            builder.HasOne(t => t.TicketCategory).WithMany(c => c.Tickets).HasForeignKey(t => t.CategoryId).OnDelete(DeleteBehavior.Restrict);

            builder.HasDiscriminator<string>("TicketType")
                .HasValue<FlightTicket>("flight")
                .HasValue<HotelTicket>("hotel")
                .HasValue<ConcertTicket>("concert")
                .HasValue<MovieTicket>("movie")
                .HasValue<TrainTicket>("train")
                .HasValue<BusTicket>("bus")
                .HasValue<SeaTransportationTicket>("seatransportation");

            builder.Property(t => t.Amenities)
                .HasColumnName("Amenities")
                .HasColumnType("jsonb")
                .HasConversion(
                    v => JsonSerializer.Serialize(v ?? new List<string>(), new JsonSerializerOptions()), v => JsonSerializer.Deserialize<List<string>>(v, new JsonSerializerOptions()), new ValueComparer<List<string>>((c1, c2) => c1!.SequenceEqual(c2!), c => c.Aggregate(0, (a, v) => HashCode.Combine(a, v.GetHashCode())), c => c.ToList()));

        });

        var sharedProps = new[] {
            nameof(TicketBase.DepartureTime),
            nameof(TicketBase.Duration),
            nameof(TicketBase.SeatClass),
            nameof(TicketBase.TransitsCount),
            nameof(TicketBase.BaggageKg)
        };

        foreach (var prop in sharedProps)
        {
            modelBuilder.Entity<FlightTicket>().Property(prop).HasColumnName(prop);
            modelBuilder.Entity<TrainTicket>().Property(prop).HasColumnName(prop);
            modelBuilder.Entity<BusTicket>().Property(prop).HasColumnName(prop);
            modelBuilder.Entity<SeaTransportationTicket>().Property(prop).HasColumnName(prop);
        }

        // categories
        modelBuilder.Entity<TicketCategory>(builder =>
        {
            builder.HasKey(tc => tc.Id);
            builder.Property(tc => tc.Id).ValueGeneratedNever();
            builder.HasIndex(tc => tc.TicketCategoryName).IsUnique();
        });

        // booked tickets
        modelBuilder.Entity<BookedTicket>(builder =>
        {
            builder.ToTable("BookedTickets");
            builder.HasKey(bt => new { bt.Id });
            builder.Property(bt => bt.Id).ValueGeneratedNever();
            builder.HasIndex(t => t.BookedTicketCode).IsUnique();
            builder.HasOne(bt => bt.Ticket).WithMany().HasForeignKey(bt => bt.TicketId).OnDelete(DeleteBehavior.Restrict);
            builder.HasOne(bt => bt.Booking).WithMany(b => b.BookedTickets).HasForeignKey(bt => bt.BookingId).OnDelete(DeleteBehavior.Cascade);
        });

        // bookings
        modelBuilder.Entity<Booking>(builder =>
        {
            builder.ToTable("Bookings");

            builder.HasKey(bk => new { bk.Id });
            builder.Property(bk => bk.Id).ValueGeneratedNever();
            builder.Property(bk => bk.Status).HasConversion<int>();
            builder.HasIndex(bk => bk.UserId);
        });
    }
}

/*
modelBuilder.Entity<TicketBase>(builder =>
        {
            builder.ToTable("Tickets");

            builder.HasKey(t => t.Id);
            builder.Property(t => t.Id).ValueGeneratedNever();
            builder.HasIndex(t => t.TicketCode).IsUnique();
            builder.HasOne(t => t.TicketCategory).WithMany(c => c.Tickets).HasForeignKey(t => t.CategoryId).OnDelete(DeleteBehavior.Restrict);

            builder.HasDiscriminator<string>("TicketType")
                .HasValue<TicketBase>("TicketBase")
                .HasValue<FlightTicket>("flight")
                .HasValue<HotelTicket>("hotel")
                .HasValue<ConcertTicket>("concert")
                .HasValue<MovieTicket>("movie")
                .HasValue<TrainTicket>("train")
                .HasValue<BusTicket>("bus")
                .HasValue<SeaTransportationTicket>("seatransportation");
        });

*/