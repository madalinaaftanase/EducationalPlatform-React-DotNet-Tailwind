using MediatR;
using PlatformaEducationala.Core.Repositories;
using Serilog;

namespace PlatformaEducationala.Core.Project.Queries.GetById;

public class GetByIdQuery : IRequest<GetByIdResponse>
{
    public Guid CurrentUserId { get; set; }
    public Guid Id { get; set; }
}

public class GetByIdHandler : IRequestHandler<GetByIdQuery, GetByIdResponse>
{
    private readonly ILogger _logger;
    private readonly IProjectRepository _projectRepository;

    public GetByIdHandler(ILogger logger, IProjectRepository projectRepository)
    {
        _logger = logger;
        _projectRepository = projectRepository;
    }

    public async Task<GetByIdResponse> Handle(GetByIdQuery request, CancellationToken cancellationToken)
    {
        var response = new GetByIdResponse();
        var project = await _projectRepository.GetById(request.Id, request.CurrentUserId);

        response.Project = project;
        return response;
    }
}