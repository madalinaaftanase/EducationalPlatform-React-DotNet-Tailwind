using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PlatformaEducationala.Core.Entities;

namespace PlatformaEducationala.Data.Context.Configurations;

public class ProjectsConfiguration : IEntityTypeConfiguration<Project>
{
    public void Configure(EntityTypeBuilder<Project> builder)
    {
        builder.Property(x => x.Id).IsRequired();
        builder.Property(x => x.Name).IsRequired();
        builder.Property(x => x.Xml).IsRequired(false);
        builder.HasOne(x => x.Student).WithMany(x => x.Projects).HasForeignKey(x => x.StudentId).IsRequired(false);
        builder.HasOne(x => x.Teacher).WithMany(x => x.Projects).HasForeignKey(x => x.TeacherId).IsRequired(false);
    }
}