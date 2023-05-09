namespace PlatformaEducationala.Core.User.Models;
    public class StudentTableDto
    {
        public Guid Id { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Email { get; set; }
        public string GroupName { get; set; }
        public Guid GroupId { get; set; }

}
