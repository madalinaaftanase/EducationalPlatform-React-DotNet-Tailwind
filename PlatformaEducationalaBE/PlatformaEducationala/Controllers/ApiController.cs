using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PlatformaEducationala.Core.Common;
using PlatformaEducationala.Core.Enums;

namespace PlatformaEducationala.Api.Controllers;
[ApiController]
[Authorize(Roles = TeacherOrStudent)]
public class ApiController: ControllerBase
{
    protected const string TeacherRole = "teacher";
    protected const string StudentRole = "student";
    protected const string TeacherOrStudent = TeacherRole + "," + StudentRole;
    protected ActionResult HandleMediatorResponse(BaseResponse result)
    {
        switch (result.ResponseStatus)
        {
            case ResultStatus.Ok:
                return Ok(result);
            case ResultStatus.BadRequest:
                return BadRequest(result);
            case ResultStatus.NotFound:
                return NotFound(result);
            case ResultStatus.NotAuthorized:
            case ResultStatus.Forbidden:
                return Forbid();
            case ResultStatus.InternalError:
            default:
                return StatusCode(StatusCodes.Status500InternalServerError, result);
        }
    }
}
