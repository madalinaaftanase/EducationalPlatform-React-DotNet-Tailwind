
using PlatformaEducationala.Core.Homework.Models;
using PlatformaEducationala.Core.User.Models;

namespace PlatformaEducationala.Core.Project.Models;
    public class ProjectDto: Entities.Project
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Xml { get; set; }
        public Guid? TeacherId { get; set; }
        public string? Comment { get; set; }
        public float? Grade { get; set; }

        public HomeworkDto? Homework { get; set; }
        public ICollection<StudentDto> Students { get; set; }
}
