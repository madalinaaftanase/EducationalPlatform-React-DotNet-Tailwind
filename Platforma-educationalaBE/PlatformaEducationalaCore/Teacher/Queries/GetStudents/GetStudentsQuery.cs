using MediatR;
using Microsoft.Extensions.Logging;
using PlatformaEducationala.Core.Enums;
using PlatformaEducationala.Core.Repositories;
using PlatformaEducationala.Core.User.Models;

namespace PlatformaEducationala.Core.Teacher.Queries.GetStudents;

public class GetStudentsQuery : IRequest<GetStudentsResponse>
{
    public Guid CurrentUserId { get; set; }
    public Guid TeacherId { get; set; }
}

public class GetStudentsQueryHandler : IRequestHandler<GetStudentsQuery, GetStudentsResponse>
{
    private readonly ILogger _logger;
    private readonly ITeacherRepository _teacherRepository;

    public GetStudentsQueryHandler(ITeacherRepository teacherRepository, ILogger<GetStudentsQueryHandler> logger)
    {
        _teacherRepository = teacherRepository;
        _logger = logger;
    }

    public async Task<GetStudentsResponse> Handle(GetStudentsQuery query, CancellationToken cancellationToken)
    {
        _logger.LogInformation("Exemplu logging");
        if (query.CurrentUserId != query.TeacherId)
            return new GetStudentsResponse
            {
                Errors = { "Nu ai acces la studentii altui profesor" },
                ResponseStatus = ResultStatus.NotAuthorized
            };

        var students = await _teacherRepository.GetStudents(query);

        var result = new GetStudentsResponse
        {
            Students = students
        };

        return result;
    }
}