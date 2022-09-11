
using PlatformaEducationala.Core.Common;

namespace PlatformaEducationala.Core.Entities;

public class Student : BaseEntity
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Password { get; set; }
    public string Email { get; set; }

}
