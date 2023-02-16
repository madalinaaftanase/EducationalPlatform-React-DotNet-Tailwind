namespace PlatformaEducationala.Core.Entities;

public class Student : Common.User
{
    public ICollection<Project> Projects { get; set; }
    public ICollection<StudentGroup> StudentGroups { get; set; }
}
