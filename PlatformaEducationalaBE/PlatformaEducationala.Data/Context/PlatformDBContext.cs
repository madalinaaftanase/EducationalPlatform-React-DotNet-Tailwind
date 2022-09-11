
using Microsoft.EntityFrameworkCore;
using PlatformaEducationala.Core.Entities;
using System.Reflection;

namespace PlatformaEducationala.Data.Context;

public class PlatformDBContext : DbContext
{
    public DbSet<Student> Students { get; set; }
    public PlatformDBContext(DbContextOptions<PlatformDBContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
    }
}
