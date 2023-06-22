
using Microsoft.EntityFrameworkCore;
using PlatformaEducationala.Core.Entities;
using System.Reflection;

namespace PlatformaEducationala.Data.Context;

public class PlatformDBContext : DbContext
{
    public DbSet<Student> Students { get; set; }
    public DbSet<Teacher> Teachers { get; set; }
    public DbSet<Project> Projects { get; set; }
    public DbSet<Group> Groups { get; set; }
    public DbSet<StudentGroup> StudentGroups { get; set; }
    public DbSet<StudentProject> StudentProjects { get; set; }

    public DbSet<Homework> Homeworks { get; set; }
    public PlatformDBContext(DbContextOptions<PlatformDBContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
    }
}
