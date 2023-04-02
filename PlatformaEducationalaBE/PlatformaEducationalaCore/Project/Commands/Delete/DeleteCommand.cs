using MediatR;
using Microsoft.Extensions.Logging;
using PlatformaEducationala.Core.Enums;
using PlatformaEducationala.Core.Repositories;

namespace PlatformaEducationala.Core.Project.Commands.Delete;

public class DeleteCommand : IRequest<DeleteResponse>
{
    public Guid CurrentUserId { get; set; }
    public Guid Id { get; set; }
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
        var project = await _projectRepository.GetById(command.Id, command.CurrentUserId);
        if (project == null)
        {
            response.Errors = new List<string> { "Proiectul nu a fost gasit" };
            response.ResponseStatus = ResultStatus.NotFound;
            return response;
        }

        try
        {
            _projectRepository.DeleteAsync(project);
        }
        catch (Exception e)
        {
            response.Errors = new List<string> { $"Eroare la stergere{e}" };
            response.ResponseStatus = ResultStatus.InternalError;
        }

        response.ResponseMessage = "Proiect sters cu success";
        return response;
    }
}