using MediatR;
using Microsoft.AspNetCore.Mvc;
using PlatformaEducationala.Core.User.Commands.CreateAccount;
using PlatformaEducationala.Core.User.Commands.LoginAccount;
using PlatformaEducationala.Core.User.Models;

namespace PlatformaEducationala.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ApiController
    {
        private readonly IMediator _mediator;

        public AuthController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("register")]
        public async Task<ActionResult> Post([FromBody] CreateAccountCommand command)
        {
            var result = await _mediator.Send(command);
            return HandleMediatorResponse(result);
        }
        [HttpPost("login")]
        public async Task<ActionResult<LoginAccountResponse>> Post([FromBody] LoginAccountCommand command)
        {
            var result = await _mediator.Send(command);
            return HandleMediatorResponse(result);
        }

    }
}
