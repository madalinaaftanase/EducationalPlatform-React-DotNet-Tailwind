using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PlatformaEducationala.Core.Common;
using PlatformaEducationala.Core.Homework.Commands.AddHome;
using PlatformaEducationala.Core.Homework.Commands.UpdateHomework;
using PlatformaEducationala.Core.Homework.Models;
using PlatformaEducationala.Core.Homework.Queries.Get;

namespace PlatformaEducationala.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize(Roles = TeacherOrStudent)]
public class HomeworkController : ApiController
{
    private readonly IMediator _mediator;

    public HomeworkController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<ActionResult<List<HomeworkDto>>> GetHomework([FromQuery] GetQuery query) 
    {
        query.CurrentUserId = Guid.Parse(UserId);

        var result = await _mediator.Send(query);

        return HandleMediatorResponse(result);
    }

    [HttpPost]
    public async Task<ActionResult<BaseResponse>> AddHomework([FromQuery] Guid groupId, [FromBody] AddHomeworkCommand command)
    {
        command.CurrentUserId = Guid.Parse(UserId);
        command.GroupId = groupId;

        var result = await _mediator.Send(command);

        return HandleMediatorResponse(result);
    }

    [HttpPut("{homeworkId}")]
    public async Task<ActionResult<BaseResponse>> UpdateHomework([FromRoute] Guid homeworkId, [FromBody] UpdateHomeworkCommand command)
    {
        command.CurrentUserId = Guid.Parse(UserId);
        command.HomeworkId = homeworkId;

        var result = await _mediator.Send(command);

        return HandleMediatorResponse(result);
    }
}