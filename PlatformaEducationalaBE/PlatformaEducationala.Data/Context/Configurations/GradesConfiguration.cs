using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PlatformaEducationala.Core.Entities;

namespace PlatformaEducationala.Data.Context.Configurations;
    public class GradesConfiguration : IEntityTypeConfiguration<Grade>
    {
        public void Configure(EntityTypeBuilder<Grade> builder)
        {
            builder.Property(x => x.Id).IsRequired();
            builder.Property(x=>x.Value).IsRequired();
            builder.HasOne(x => x.Teacher).WithMany(x => x.Grades).HasForeignKey(x => x.TecherId).IsRequired(true);
    }
}
