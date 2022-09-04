using MediatR;
using Microsoft.AspNetCore.Mvc;
using PlatformaEducationala.Core.Models;
using PlatformaEducationala.Core.User.Queries.Get;

namespace PlatformaEducationala.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UsersController: ApiController
{
    private readonly IMediator _mediator;

    public UsersController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<ActionResult<List<UserDto>>> Get()
    {
        var result = await _mediator.Send(new GetQuery());

        return HandleMediatorResponse(result);
    }
}
