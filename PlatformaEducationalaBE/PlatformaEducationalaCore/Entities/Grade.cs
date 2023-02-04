
using PlatformaEducationala.Core.Common;

namespace PlatformaEducationala.Core.Entities;
    public class Grade: BaseEntity
    {
        public Teacher Teacher { get; set; }
        public Guid TecherId { get; set; }
        public ICollection<Project> Projects { get; set; }
    }
