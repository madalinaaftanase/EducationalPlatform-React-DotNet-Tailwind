namespace PlatformaEducationala.Core.Entities;
    public class StudentProject
    {
        public Guid StudentId { get; set; }
        public Student Student { get; set; }
        public Guid ProjectId { get; set; }
        public Project Project { get; set; }
}
