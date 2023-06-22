namespace PlatformaEducationala.Core.Entities;

public class Teacher : Common.User
{
    public ICollection<Group> Groups { get; set; }
    public ICollection<Project> Projects { get; set; }

    public ICollection<Homework> Homeworks { get; set; }
}
