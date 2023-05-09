using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PlatformaEducationala.Core.Teacher.Queries.GetStudents;
using PlatformaEducationala.Core.User.Models;
using PlatformaEducationala.Core.User.Queries.Get;

namespace PlatformaEducationala.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize(Roles = TeacherOrStudent)]
public class TeachersController : ApiController
{
    private readonly IMediator _mediator;
    public TeachersController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet("{id}/Students")]
    public async Task<ActionResult<List<StudentTableDto>>> GetStudents([FromRoute] Guid id)
    {
        var query = new GetStudentsQuery { CurrentUserId = Guid.Parse(UserId) };
        query.TeacherId=id;
        var result = await _mediator.Send(query);

        return HandleMediatorResponse(result);
    }
}