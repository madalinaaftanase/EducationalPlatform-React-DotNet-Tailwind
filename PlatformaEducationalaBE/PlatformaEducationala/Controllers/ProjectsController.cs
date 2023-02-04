﻿using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PlatformaEducationala.Core.Project.Models;
using PlatformaEducationala.Core.User.Queries.Get;

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
    public async Task<ActionResult<List<ProjectDto>>> Get()
    {
        var result = await _mediator.Send(new GetQuery());

        return HandleMediatorResponse(result);
    }
}