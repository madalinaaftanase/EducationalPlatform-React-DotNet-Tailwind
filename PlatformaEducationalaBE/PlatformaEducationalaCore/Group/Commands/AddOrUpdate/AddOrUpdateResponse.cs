
using PlatformaEducationala.Core.Common;
using PlatformaEducationala.Core.Group.Models;
using PlatformaEducationala.Core.User.Models;

namespace PlatformaEducationala.Core.Group.Commands.AddOrUpdate;
    public class AddOrUpdateResponse: BaseResponse
    {
        public GroupDto Group { get; set; }
    }
