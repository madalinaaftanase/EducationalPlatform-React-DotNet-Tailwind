using MediatR;
using Microsoft.AspNetCore.Mvc;
using PlatformaEducationala.Core.User.Commands.CreateAccount;
using PlatformaEducationala.Core.User.Models;
using PlatformaEducationala.Core.User.Queries.Get;

namespace PlatformaEducationala.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class StudentsController: ApiController
{
    private readonly IMediator _mediator;

    public StudentsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<ActionResult<List<StudentDto>>> Get()
    {
        var result = await _mediator.Send(new GetQuery());

        return HandleMediatorResponse(result);
    }
}
