namespace PlatformaEducationala.Core.Entities;

public class Student : Common.User
{
    public ICollection<StudentGroup> StudentGroups { get; set; }
    public ICollection<StudentProject> StudentProjects { get; set; }
}
