
using PlatformaEducationala.Core.Common;

namespace PlatformaEducationala.Core.Entities;
    public class Project : BaseEntity
    {
        public string Name { get; set; }
        public string Xml { get; set; }
        public Grade Grade { get; set; }
        public Guid? GradeId { get; set; }
        public Guid? StudentId { get; set; }
        public Student Student { get; set; }
        public Guid? TeacherId { get; set; }
        public Teacher Teacher { get; set; }
        public ICollection<StudentProject> StudentProjects { get; set; }
}
