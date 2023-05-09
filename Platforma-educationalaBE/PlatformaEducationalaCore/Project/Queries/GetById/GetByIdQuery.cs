using MediatR;
using Microsoft.Extensions.Logging;
using PlatformaEducationala.Core.Repositories;

namespace PlatformaEducationala.Core.Project.Queries.GetById;

public class GetByIdQuery : IRequest<GetByIdResponse>
{
    public Guid CurrentUserId { get; set; }
    public Guid? OwnerId { get; set; }
    public Guid Id { get; set; }
    public bool? IsTeacher { get; set; }
}

public class GetByIdHandler : IRequestHandler<GetByIdQuery, GetByIdResponse>
{
    private readonly ILogger _logger;
    private readonly IProjectRepository _projectRepository;

    public GetByIdHandler(ILogger<GetByIdHandler> logger, IProjectRepository projectRepository)
    {
        _logger = logger;
        _projectRepository = projectRepository;
    }

    public async Task<GetByIdResponse> Handle(GetByIdQuery query, CancellationToken cancellationToken)
    {
        var response = new GetByIdResponse();
        var project = await _projectRepository.GetById(query);

        response.Project = project;
        return response;
    }
}