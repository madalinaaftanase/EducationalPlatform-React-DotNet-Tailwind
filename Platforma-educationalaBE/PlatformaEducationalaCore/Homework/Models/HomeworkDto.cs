namespace PlatformaEducationala.Core.Homework.Models;

public class HomeworkDto
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public Guid TeacherId { get; set; }
    public Guid StudentId { get; set; }
    public Guid? ProjectId { get; set; }
}