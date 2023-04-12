using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PlatformaEducationala.Core.Project.Commands.Create;
using PlatformaEducationala.Core.Project.Commands.Delete;
using PlatformaEducationala.Core.Project.Commands.Update;
using PlatformaEducationala.Core.Project.Models;
using PlatformaEducationala.Core.Project.Queries.Get;
using PlatformaEducationala.Core.Project.Queries.GetById;

namespace PlatformaEducationala.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize(Roles = TeacherOrStudent)]
public class ProjectsController : ApiController
{
    private readonly IMediator _mediator;

    public ProjectsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<ActionResult<List<ProjectDto>>> Get([FromQuery] GetQuery query)
    {
        query.CurrentUserId = Guid.Parse(UserId);
        var result = await _mediator.Send(query);

        return HandleMediatorResponse(result);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<List<ProjectDto>>> GetById([FromRoute] GetByIdQuery query,
        [FromQuery(Name = "isTeacher")] bool isTeacher)
    {
        query.CurrentUserId = Guid.Parse(UserId);
        query.IsTeacher = isTeacher;
        var result = await _mediator.Send(query);

        return HandleMediatorResponse(result);
    }

    [HttpPost("{id}/Save")]
    public async Task<ActionResult<string>> Save([FromBody] SaveCommand command,
        [FromQuery(Name = "isTeacher")] bool isTeacher)
    {
        command.CurrentUserId = Guid.Parse(UserId);
        command.IsTeacher = isTeacher;
        var result = await _mediator.Send(command);
        return HandleMediatorResponse(result);
    }

    [HttpPost]
    public async Task<ActionResult<string>> Create([FromBody] CreateCommand command)
    {
        command.CurrentUserId = Guid.Parse(UserId);
        var result = await _mediator.Send(command);
        return HandleMediatorResponse(result);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<string>> Delete([FromRoute] DeleteCommand command,
        [FromQuery(Name = "isTeacher")] bool isTeacher)
    {
        command.CurrentUserId = Guid.Parse(UserId);
        command.IsTeacher = isTeacher;
        var result = await _mediator.Send(command);
        return HandleMediatorResponse(result);
    }
}