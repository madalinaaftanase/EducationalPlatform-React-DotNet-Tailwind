
using PlatformaEducationala.Core.Common;

namespace PlatformaEducationala.Core.Entities;
    public class Project : BaseEntity
    {
        public Grade Grade { get; set; }
        public Guid GradeId { get; set; }
        public Guid StudentId { get; set; }
        public Student Student { get; set; }
    }
