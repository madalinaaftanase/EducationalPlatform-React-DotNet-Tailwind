using MediatR;
using Microsoft.Extensions.Logging;
using PlatformaEducationala.Core.Repositories;

namespace PlatformaEducationala.Core.Group.Queries.Get;

public class GetQuery : IRequest<GetResponse>
{
    public Guid CurrentUserId { get; set; }
    public bool IsTeacher { get; set; }
}

public class GetQueryHndler : IRequestHandler<GetQuery, GetResponse>
{
    private readonly IGroupRepository _groupRepository;
    private readonly IStudentRepository _studentRepository;
    private readonly ILogger _logger;


    public GetQueryHndler(IGroupRepository groupRepository, ILogger<GetQueryHndler> logger, IStudentRepository studentRepository)
    {
        _groupRepository = groupRepository;
        _studentRepository = studentRepository;
        _logger = logger;
    }

    public async Task<GetResponse> Handle(GetQuery query, CancellationToken cancellationToken)
    {
        _logger.LogInformation("Start Handle");
        var result = new GetResponse();
        var groups = await _groupRepository.GetAll(query);
        foreach (var group in groups)
        {
            var studentsGroup = await _studentRepository.GetStudentsGroup(group.Id);
            group.StudentsCount = studentsGroup.Count();
        }
        result.Groups = groups;

        return result;
    }
}