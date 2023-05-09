using MediatR;
using Microsoft.Extensions.Logging;
using PlatformaEducationala.Core.Repositories;
using PlatformaEducationala.Core.User.Models;


namespace PlatformaEducationala.Core.User.Queries.Get;

public class GetQuery: IRequest<GetResponse>
{
    public Guid CurrentUserId { get; set; }
}

public class GetQueryHandler : IRequestHandler<GetQuery, GetResponse>
{
    private readonly IStudentRepository _studentRepository;
    private readonly ILogger _logger;

   public GetQueryHandler(IStudentRepository studentRepository, ILogger<GetQueryHandler> logger)
    {
        _studentRepository = studentRepository;
        _logger = logger;
    }

    public async Task<GetResponse> Handle(GetQuery query, CancellationToken cancellationToken)
    {
        _logger.LogInformation("Exemplu logging");
        var students = await _studentRepository.GetAll();

        var result = new GetResponse
        {
            Students = students.Select(user => new StudentDto
            {
                Email = user.Email
            }).ToList(),
        };

        return result;
    }
}
