using PlatformaEducationala.Core.Common;
using PlatformaEducationala.Core.Group.Models;

namespace PlatformaEducationala.Core.Group.Queries.GetById;
    public class GetByIdResponse : BaseResponse
    {
        public GroupDto Group { get; set; }
    }
