using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PlatformaEducationala.Core.Entities;

namespace PlatformaEducationala.Data.Context.Configurations;
    public class StudentsProjectsConfiguration: IEntityTypeConfiguration<StudentProject>
{
    public void Configure(EntityTypeBuilder<StudentProject> builder)
    {
        builder.HasKey(x => new { x.StudentId, x.ProjectId });
        builder.HasOne(x => x.Student).WithMany(x => x.StudentProjects).HasForeignKey(x => x.StudentId);
        builder.HasOne(x => x.Project).WithMany(x => x.StudentProjects).HasForeignKey(x => x.ProjectId);
    }
}
