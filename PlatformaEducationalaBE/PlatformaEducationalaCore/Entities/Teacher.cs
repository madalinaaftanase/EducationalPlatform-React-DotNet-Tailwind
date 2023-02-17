namespace PlatformaEducationala.Core.Entities;

public class Teacher : Common.User
{
    public ICollection<Grade> Grades { get; set; }
    public ICollection<Group> Groups { get; set; }
}
