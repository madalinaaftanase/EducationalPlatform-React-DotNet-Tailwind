using PlatformaEducationala.Core.Common;
using PlatformaEducationala.Core.Homework.Models;

namespace PlatformaEducationala.Core.Homework.Queries.Get;

public class GetResponse : BaseResponse
{
    public List<HomeworkDto> Homeworks { get; set; }
}
