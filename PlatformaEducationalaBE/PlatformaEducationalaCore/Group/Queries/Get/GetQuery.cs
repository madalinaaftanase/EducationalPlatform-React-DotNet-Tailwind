using MediatR;
using Microsoft.Extensions.Logging;
using PlatformaEducationala.Core.Group.Models;
using PlatformaEducationala.Core.Repositories;

namespace PlatformaEducationala.Core.Group.Queries.Get;

public class GetQuery : IRequest<GetResponse>
{
    public Guid CurrentUserId { get; set; }
    public bool IsTeacher { get; set; }
}

public class GetQueryHndler : IRequestHandler<GetQuery, GetResponse>
{
    private readonly ILogger _logger;
    private readonly IGroupRepository _groupRepository;


    public GetQueryHndler(IGroupRepository groupRepository, ILogger<GetQueryHndler> logger)
    {
        _groupRepository = groupRepository;
        _logger = logger;
    }

    public async Task<GetResponse> Handle(GetQuery request, CancellationToken cancellationToken)
    {
        _logger.LogInformation("Start Handle");
        var projects = await _groupRepository.GetAll(request);

        if (projects == null)
        {
            return new GetResponse();
        }

        var result = new GetResponse
        {
            Groups = projects.Select(project => new GroupDto
            {
                Name = project.Name,
                Id = project.Id,
            }).ToList()
        };

        return result;
    }
}