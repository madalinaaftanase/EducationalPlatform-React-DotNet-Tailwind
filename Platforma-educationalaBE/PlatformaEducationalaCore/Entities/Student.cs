namespace PlatformaEducationala.Core.Entities;

public class Student : Common.User
{
    public ICollection<Project> Projects { get; set; }
    public ICollection<StudentGroup> StudentGroups { get; set; }
    public ICollection<StudentProject> StudentProjects { get; set; }
}
