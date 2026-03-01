using AccelokaSandy.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace AccelokaSandy.Infrastructure.Persistence;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions options) : base(options)
    {
        //
    }

    public DbSet<TicketBase> Tickets { get; set; }
    public DbSet<TicketCategory> TicketCategories { get; set; }
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
                .HasValue<TicketBase>("TicketBase")
                .HasValue<FlightTicket>("flight");
        });

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
            builder.HasKey(bt => new { bt.Id, bt.BookedTicketCode });
            builder.Property(bt => bt.Id).ValueGeneratedNever();
            builder.HasOne(bt => bt.Ticket).WithMany().HasForeignKey(bt => bt.TicketId).OnDelete(DeleteBehavior.Restrict);
        });
    }
}