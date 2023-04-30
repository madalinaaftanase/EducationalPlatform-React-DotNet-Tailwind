using PlatformaEducationala.Core.Common;
using PlatformaEducationala.Core.Group.Models;

namespace PlatformaEducationala.Core.Group.Commands.AddOrUpdate;
    public class AddResponse: BaseResponse
    {
        public GroupDto Group { get; set; }
    }
