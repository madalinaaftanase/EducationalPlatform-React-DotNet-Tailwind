
namespace PlatformaEducationala.Core.Project.Models;
    public class ProjectDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Xml { get; set; }
        public Guid StudentId { get; set; }
        public Guid TeacherId { get; set; }
        public string? Comment { get; set; }
        public float? Grade { get; set; }
}
