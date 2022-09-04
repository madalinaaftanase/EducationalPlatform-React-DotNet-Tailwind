using Microsoft.AspNetCore.Mvc;
using PlatformaEducationala.Core.Common;
using PlatformaEducationala.Core.Enums;

namespace PlatformaEducationala.Api.Controllers
{
    public class ApiController: ControllerBase
    {
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
}
