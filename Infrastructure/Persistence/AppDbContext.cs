using System.Net.Sockets;
using System.Security.Principal;
using AccelokaSandy.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace AccelokaSandy.Infrastructure.Persistence;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions options) : base(options)
    {
        //
    }

    public DbSet<Ticket> Tickets { get; set; }
    public DbSet<TicketCategory> TicketCategories { get; set; }
    public DbSet<BookedTicket> BookedTickets { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // tickets

        modelBuilder.Entity<Ticket>().HasKey(t => t.Id);
        modelBuilder.Entity<Ticket>().Property(t => t.Id).ValueGeneratedNever();
        modelBuilder.Entity<Ticket>().HasOne(t => t.TicketCategory).WithMany(c => c.Tickets).HasForeignKey(t => t.CategoryId).OnDelete(DeleteBehavior.Restrict);
        modelBuilder.Entity<Ticket>().HasIndex(t => t.TicketCode).IsUnique();

        // categories
        modelBuilder.Entity<TicketCategory>().HasKey(tc => tc.Id);
        modelBuilder.Entity<TicketCategory>().Property(tc => tc.Id).ValueGeneratedNever();
        modelBuilder.Entity<TicketCategory>().HasIndex(tc => tc.TicketCategoryName).IsUnique();

        // booked tickets
        modelBuilder.Entity<BookedTicket>().HasKey(bt => bt.Id);
        modelBuilder.Entity<BookedTicket>().Property(bt => bt.Id).ValueGeneratedNever();
        modelBuilder.Entity<BookedTicket>().HasOne(bt => bt.Ticket).WithMany().HasForeignKey(bt => bt.TicketId).OnDelete(DeleteBehavior.Restrict);
        modelBuilder.Entity<BookedTicket>().HasIndex(bt => bt.BookedTicketCode).IsUnique();
    }
}