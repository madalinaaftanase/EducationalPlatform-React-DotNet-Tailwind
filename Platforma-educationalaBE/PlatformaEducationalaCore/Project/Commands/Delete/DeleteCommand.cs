﻿using MediatR;
using Microsoft.Extensions.Logging;
using PlatformaEducationala.Core.Enums;
using PlatformaEducationala.Core.Project.Queries.GetById;
using PlatformaEducationala.Core.Repositories;

namespace PlatformaEducationala.Core.Project.Commands.Delete;

public class DeleteCommand : IRequest<DeleteResponse>
{
    public Guid CurrentUserId { get; set; }
    public Guid Id { get; set; }
    public bool IsTeacher { get; set; }
}

public class DeleteCommandHandler : IRequestHandler<DeleteCommand, DeleteResponse>
{
    private readonly ILogger _logger;
    private readonly IProjectRepository _projectRepository;

    public DeleteCommandHandler(ILogger<DeleteCommandHandler> logger, IProjectRepository projectRepository)
    {
        _projectRepository = projectRepository;
        _logger = logger;
    }

    public async Task<DeleteResponse> Handle(DeleteCommand command, CancellationToken cancellationToken)
    {
        var response = new DeleteResponse();
        var project = await _projectRepository.GetById(new GetByIdQuery()
        {
            CurrentUserId = command.CurrentUserId,
            Id = command.Id,
            IsTeacher = command.IsTeacher
        });

        if (project == null)
        {
            response.Errors = new List<string> { "Proiectul nu a fost gasit" };
            response.ResponseStatus = ResultStatus.NotFound;
            return response;
        }

        if (!command.IsTeacher && project.Homework !=null)
        {
            response.Errors = new List<string> { "Proiectul are o tema atasata" };
            response.ResponseStatus = ResultStatus.BadRequest;
            return response;
        }

        try
        {
            if (command.IsTeacher || project.Students.Count == 1)
            {
               await _projectRepository.DeleteAsync(project);
            }
            else
            {
               await _projectRepository.RemoveStudent(command.CurrentUserId, project.Id);
            }
        }
        catch (Exception e)
        {
            response.Errors = new List<string> { $"Eroare la stergere" };
            response.ResponseStatus = ResultStatus.InternalError;
        }

        response.ResponseMessage = "Proiect sters cu success";
        return response;
    }
}