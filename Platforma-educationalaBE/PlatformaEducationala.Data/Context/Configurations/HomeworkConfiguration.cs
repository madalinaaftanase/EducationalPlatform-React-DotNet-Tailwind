using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PlatformaEducationala.Core.Entities;

namespace PlatformaEducationala.Data.Context.Configurations;

public class HomeworkConfiguration : IEntityTypeConfiguration<Homework>
{
    public void Configure(EntityTypeBuilder<Homework> builder)
    {
        builder.Property(x => x.Id).IsRequired();
        builder.Property(x => x.Name).IsRequired();
        builder.HasOne(x => x.Teacher).WithMany(x => x.Homeworks).HasForeignKey(x => x.TeacherId).IsRequired();
        builder.HasOne(x => x.Student).WithMany(x => x.Homeworks).HasForeignKey(x => x.StudentId).IsRequired();
        builder.HasOne(x => x.Project).WithOne(x => x.Homework).HasForeignKey<Homework>(x => x.ProjectId).IsRequired(false);
    }
}