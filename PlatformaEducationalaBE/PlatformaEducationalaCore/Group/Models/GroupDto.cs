namespace PlatformaEducationala.Core.Group.Models;

public class GroupDto
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public Guid? TeacherId { get; set; }
}
