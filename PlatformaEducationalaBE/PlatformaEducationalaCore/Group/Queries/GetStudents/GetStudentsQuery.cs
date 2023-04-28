using MediatR;
using Microsoft.Extensions.Logging;
using PlatformaEducationala.Core.Repositories;

namespace PlatformaEducationala.Core.Group.Queries.GetStudents;

public class GetStudentsQuery : IRequest<GetStudentsResponse>
{
    public Guid CurrentUserId { get; set; }
    public Guid GroupId { get; set; }
}

public class GetStudentsQueryHandler : IRequestHandler<GetStudentsQuery, GetStudentsResponse>
{
    private readonly IGroupRepository _groupRepository;
    private readonly ILogger _logger;

    public GetStudentsQueryHandler(IGroupRepository groupRepository, ILogger<GetStudentsQueryHandler> logg)
    {
        _logger = logg;
        _groupRepository = groupRepository;
    }

    public async Task<GetStudentsResponse> Handle(GetStudentsQuery query, CancellationToken cancellationToken)
    {
        var students = await _groupRepository.GetStudentsGroup(query);
        var response = new GetStudentsResponse
        {
            Students = students
        };

        return response;
    }
}