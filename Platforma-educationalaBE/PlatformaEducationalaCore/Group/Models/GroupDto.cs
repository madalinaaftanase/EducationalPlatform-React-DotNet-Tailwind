using PlatformaEducationala.Core.Teacher.Models;

namespace PlatformaEducationala.Core.Group.Models;

public class GroupDto
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public Guid? TeacherId { get; set; }
    public int? StudentsCount { get; set; }
    public TeacherDto Teacher { get; set; }

}
