﻿using PlatformaEducationala.Core.Common;

namespace PlatformaEducationala.Core.Entities
{
    public class User: BaseEntity
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        
    }
}
