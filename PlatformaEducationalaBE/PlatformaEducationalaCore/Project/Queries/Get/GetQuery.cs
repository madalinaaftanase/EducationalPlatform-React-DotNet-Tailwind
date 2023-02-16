using MediatR;
using PlatformaEducationala.Core.Project.Models;
using PlatformaEducationala.Core.Repositories;
using Serilog;

namespace PlatformaEducationala.Core.Project.Queries.Get;

public class GetQuery : IRequest<GetResponse>
{
    public Guid CurrentUserId { get; set; }
}

public class GetQueryHndler : IRequestHandler<GetQuery, GetResponse>
{
    private readonly ILogger _logger;
    private readonly IProjectRepository _projectRepository;


    public GetQueryHndler(IProjectRepository projectRepository, ILogger logger)
    {
        _projectRepository = projectRepository;
        _logger = logger;
    }

    public async Task<GetResponse> Handle(GetQuery request, CancellationToken cancellationToken)
    {
        _logger.Information("Start Handle");
        var projects = await _projectRepository.GetAll(request.CurrentUserId);

        if (projects == null)
        {
            return new GetResponse();
        }

        var result = new GetResponse
        {
            Projects = projects.Select(project => new ProjectDto
            {
                Name = project.Name,
                Id = project.Id,
                Xml = project.Xml
            }).ToList()
        };

        return result;
    }
}