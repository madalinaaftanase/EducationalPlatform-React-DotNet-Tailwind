using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PlatformaEducationala.Core.Entities;

namespace PlatformaEducationala.Data.Context.Configurations;
    public class StudentsGroupsConfiguration : IEntityTypeConfiguration<StudentGroup>
    {
        public void Configure(EntityTypeBuilder<StudentGroup> builder)
        {
            builder.HasKey(x => new { x.StudentId, x.GroupId });
            builder.HasOne(x => x.Student).WithMany(x => x.StudentGroups).HasForeignKey(x => x.StudentId);
            builder.HasOne(x => x.Group).WithMany(x => x.StudentGroups).HasForeignKey(x => x.GroupId);
        }
    }
