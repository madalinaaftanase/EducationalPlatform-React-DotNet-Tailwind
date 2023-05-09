using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PlatformaEducationala.Core.Entities;

namespace PlatformaEducationala.Data.Context.Configurations;

public class StudentsConfiguration: IEntityTypeConfiguration<Student>
{
    public void Configure(EntityTypeBuilder<Student> builder)
    {
        builder.Property(x => x.Id).IsRequired();
        builder.Property(x => x.Email).HasMaxLength(50).IsRequired();
        builder.Property(x=> x.Lastname).IsRequired();
        builder.Property(x => x.Firstname).IsRequired();
        builder.Property(x=> x.Password).IsRequired();

    }
}
