using MediatR;
using Microsoft.Extensions.Logging;
using PlatformaEducationala.Core.Repositories;

namespace PlatformaEducationala.Core.User.Queries.GetStudentTeachers;

public class GetStudentTeachersQuery : IRequest<GetStudentTeachersResponse>
{
    public Guid CurrentUserId { get; set; }
}

public class GetStudentTeachersQueryHandler : IRequestHandler<GetStudentTeachersQuery, GetStudentTeachersResponse>
{
    private readonly ILogger _logger;
    private readonly IStudentRepository _studentRepository;

    public GetStudentTeachersQueryHandler(ILogger<GetStudentTeachersQueryHandler> logger,
        IStudentRepository studentRepository)
    {
        _logger = logger;
        _studentRepository = studentRepository;
    }

    public async Task<GetStudentTeachersResponse> Handle(GetStudentTeachersQuery query,
        CancellationToken cancellationToken)
    {
        var response = new GetStudentTeachersResponse();
        var teachers = await _studentRepository.GetTeachers(query.CurrentUserId);
        response.Teachers = teachers;

        return response;
    }
}