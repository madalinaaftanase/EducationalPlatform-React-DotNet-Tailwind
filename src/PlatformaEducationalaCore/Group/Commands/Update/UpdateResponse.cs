
using PlatformaEducationala.Core.Common;
using PlatformaEducationala.Core.Group.Models;
using PlatformaEducationala.Core.User.Models;

namespace PlatformaEducationala.Core.Group.Commands.Update;
    public class UpdateResponse: BaseResponse
    {
        public GroupDto Group { get; set; }
    }
