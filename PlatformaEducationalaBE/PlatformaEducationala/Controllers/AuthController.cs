using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PlatformaEducationala.Core.Teacher.Commands.CreateAccount;
using PlatformaEducationala.Core.Teacher.Commands.Login;
using PlatformaEducationala.Core.User.Commands.CreateAccount;
using PlatformaEducationala.Core.User.Commands.LoginAccount;

namespace PlatformaEducationala.Api.Controllers
{
    [Route("api/[controller]")]
    [AllowAnonymous]
    public class AuthController : ApiController
    {
        private readonly IMediator _mediator;

        public AuthController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("Register/Student")]
        public async Task<ActionResult> Post([FromBody] CreateStudentAccountCommand command)
        {
            var result = await _mediator.Send(command);
            return HandleMediatorResponse(result);
        }

        [HttpPost("Register/Teacher")]
        public async Task<ActionResult> Post([FromBody] CreateTeacherAccountCommand command)
        {
            var result = await _mediator.Send(command);
            return HandleMediatorResponse(result);
        }

        [HttpPost("Login/Student")]
        public async Task<ActionResult<LoginStudentResponse>> Post([FromBody] LoginStudentCommand command)
        {
            var result = await _mediator.Send(command);
            return HandleMediatorResponse(result);
        }
        
        [HttpPost("Login/Teacher")]
        public async Task<ActionResult<LoginTeacherResponse>> Post([FromBody] LoginTeacherCommand command)
        {
            var result = await _mediator.Send(command);
            return HandleMediatorResponse(result);
        }

    }
}
