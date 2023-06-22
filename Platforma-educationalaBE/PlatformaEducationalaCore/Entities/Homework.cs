using PlatformaEducationala.Core.Common;

namespace PlatformaEducationala.Core.Entities;

public class Homework : BaseEntity
{
    public string Name { get; set; }
    public Guid TeacherId { get; set; }
    public Teacher Teacher { get; set; }

    public Guid StudentId { get; set; }
    public Student Student { get; set; }

    public Guid? ProjectId { get; set; }
    public Project Project { get; set; }
}