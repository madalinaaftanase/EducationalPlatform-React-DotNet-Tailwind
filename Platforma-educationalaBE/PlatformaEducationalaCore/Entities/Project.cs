
using PlatformaEducationala.Core.Common;

namespace PlatformaEducationala.Core.Entities;
    public class Project : BaseEntity
    {
        public string Name { get; set; }
        public string Xml { get; set; }
        public float? Grade { get; set; }
        public Guid? TeacherId { get; set; }
        public Teacher Teacher { get; set; }
        public string? Comment { get; set; }
        public ICollection<StudentProject> StudentProjects { get; set; }
        public Homework? Homework { get; set; }
}
