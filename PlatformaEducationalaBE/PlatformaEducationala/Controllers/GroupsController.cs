using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PlatformaEducationala.Core.Common;
using PlatformaEducationala.Core.Group.Commands.AddStudentGroup;
using PlatformaEducationala.Core.Group.Commands.DeleteStudentGroup;
using PlatformaEducationala.Core.Group.Models;
using PlatformaEducationala.Core.Group.Queries.Get;

namespace PlatformaEducationala.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize(Roles = TeacherOrStudent)]
public class GroupsController : ApiController
{
    private readonly IMediator _mediator;

    public GroupsController(IMediator mediator)
    {
        _mediator = mediator;
    }


    [HttpGet]
    public async Task<ActionResult<List<GroupDto>>> Get([FromQuery] GetQuery query)
    {
        query.CurrentUserId = Guid.Parse(UserId);
        var result = await _mediator.Send(query);

        return HandleMediatorResponse(result);
    }

    [HttpDelete("{groupId}/Students/{studentId}")]
    public async Task<ActionResult<BaseResponse>> DeleteStudentGroup([FromRoute] Guid studentId,
        [FromRoute] Guid groupId)
    {
        var command = new DeleteStudentGroupCommand
        {
            StudentId = studentId,
            GroupId = groupId,
            CurrentUserId = Guid.Parse(UserId)
        };

        var result = await _mediator.Send(command);
        return HandleMediatorResponse(result);
    }

    [HttpPost("{groupId}/Students")]
    public async Task<ActionResult<BaseResponse>> AddStudentGroup([FromRoute] Guid groupId,
        [FromBody] AddStudentGroupCommand command
    )
    {
        command.CurrentUserId = Guid.Parse(UserId);
        command.GroupId = groupId;

        var result = await _mediator.Send(command);
        return HandleMediatorResponse(result);
    }
}