using PlatformaEducationala.Core.Enums;

namespace PlatformaEducationala.Core.Common
{
    public class BaseResponse
    {
        public List<string> Errors { get; set; } = new List<string>();
        public ResultStatus ResponseStatus { get; set; } = ResultStatus.Ok;
    }
}
