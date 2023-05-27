
using MediatR;
using Microsoft.Extensions.Logging;
using PlatformaEducationala.Core.Enums;
using PlatformaEducationala.Core.Project.Queries.Get;
using PlatformaEducationala.Core.Repositories;


namespace PlatformaEducationala.Core.User.Queries.GetStudentsProjects;
    public class GetStudentProjectsQuery:IRequest<GetStudentProjectsResponse>
    {
        public Guid CurrentUserId { get; set; }
        public Guid StudentId { get; set; }
    }

public class GetStudentProjectsHandler : IRequestHandler<GetStudentProjectsQuery, GetStudentProjectsResponse>
{
    private readonly ILogger _logger;
    private readonly IProjectRepository _projectRepository;
    private readonly IStudentRepository _studentRepository;

    public GetStudentProjectsHandler(IProjectRepository projectRepository, ILogger<GetStudentProjectsHandler> logger, IStudentRepository studentRepository)
    {
        _logger = logger;
        _projectRepository = projectRepository;
        _studentRepository = studentRepository;
    }

    public async Task<GetStudentProjectsResponse> Handle(GetStudentProjectsQuery query, CancellationToken cancellationToken)
    {
        var response = new GetStudentProjectsResponse();
        var studentTeachers = await _studentRepository.GetTeachers(query.StudentId);
        var isAllowed = studentTeachers.Any(s => s.Id == query.CurrentUserId);

        if (!isAllowed)
        {
            response.ResponseStatus = ResultStatus.NotAuthorized;
            return response;
        }

        var queyConvertor = new GetQuery
        {
            CurrentUserId = query.StudentId,
            IsTeacher = false
        };

        response.Projects = await _projectRepository.GetAll(queyConvertor);
        return response;
    }
}
