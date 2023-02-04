
using PlatformaEducationala.Core.Common;

namespace PlatformaEducationala.Core.Entities;
    public class Group : BaseEntity
    {
        public Guid TeacherId { get; set; }
        public Teacher Teacher { get; set; }
        public ICollection<StudentGroup> StudentGroups { get; set; }

}
