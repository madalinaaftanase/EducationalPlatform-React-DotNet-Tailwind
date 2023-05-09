
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PlatformaEducationala.Core.Entities;

namespace PlatformaEducationala.Data.Context.Configurations;
    public class GroupsConfiguration: IEntityTypeConfiguration<Group>
    {
        public void Configure(EntityTypeBuilder<Group> builder)
        {
            builder.Property(x => x.Id).IsRequired();
            builder.Property(x => x.Name).IsRequired();
            builder.HasOne(x => x.Teacher).WithMany(x => x.Groups).HasForeignKey(x => x.TeacherId).IsRequired(true);
    }
}
