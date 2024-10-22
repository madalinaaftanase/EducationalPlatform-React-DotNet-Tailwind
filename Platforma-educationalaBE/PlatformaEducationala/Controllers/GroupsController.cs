﻿using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PlatformaEducationala.Core.Common;
using PlatformaEducationala.Core.Group.Commands.Add;
using PlatformaEducationala.Core.Group.Commands.AddOrUpdate;
using PlatformaEducationala.Core.Group.Commands.AddStudentGroup;
using PlatformaEducationala.Core.Group.Commands.DeleteGroup;
using PlatformaEducationala.Core.Group.Commands.DeleteStudentGroup;
using PlatformaEducationala.Core.Group.Models;
using PlatformaEducationala.Core.Group.Queries.Get;
using PlatformaEducationala.Core.Group.Queries.GetById;
using PlatformaEducationala.Core.Group.Queries.GetStudents;
using PlatformaEducationala.Core.User.Models;

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

    [HttpGet("{id}")]
    public async Task<ActionResult<GroupDto>> GetById([FromRoute] Guid id)
    {
        var query = new GetByIdQuery
        {
            GroupId = id,
            CurrentUserId = Guid.Parse(UserId)
        };
        var result = await _mediator.Send(query);

        return HandleMediatorResponse(result);
    }

    [HttpGet("{groupId}/Students")]
    public async Task<ActionResult<IList<StudentDto>>> GetStudentsGroup([FromRoute] Guid groupId
    )
    {
        var query = new GetStudentsQuery
        {
            CurrentUserId = Guid.Parse(UserId),
            GroupId = groupId
        };
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

    [HttpDelete("{groupId}")]
    public async Task<ActionResult<BaseResponse>> DeleteGroup([FromRoute] Guid groupId)
    {
        var command = new DeleteGroupCommand
        {
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

    [HttpPut("{groupId}")]
    public async Task<ActionResult<GroupDto>> AddOrUpdate([FromRoute] Guid groupId,
        [FromBody] UpdateCommand command)
    {
        command.CurrentUser = Guid.Parse(UserId);
        command.GroupId = groupId;
        var result = await _mediator.Send(command);

        return HandleMediatorResponse(result);
    }

    [HttpPut]
    public async Task<ActionResult<GroupDto>> Add([FromBody] AddCommand command)
    {
        command.CurrentUser = Guid.Parse(UserId);
        var result = await _mediator.Send(command);

        return HandleMediatorResponse(result);
    }
}