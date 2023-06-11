using MediatR;
using Microsoft.Extensions.Logging;
using PlatformaEducationala.Core.Enums;
using PlatformaEducationala.Core.Repositories;

namespace PlatformaEducationala.Core.Project.Commands.AddStudent;

public class AddStudentCommand : IRequest<AddStudentResponse>
{
    public Guid CurrentUserId { get; set; }
    public Guid ProjectId { get; set; }
    public string Email { get; set; }
}

public class AddStudendCommandHandler : IRequestHandler<AddStudentCommand, AddStudentResponse>
{
    private readonly ILogger _logger;
    private readonly IStudentRepository _studentRepository;
    private readonly IProjectRepository _projectRepository;


    public AddStudendCommandHandler(IStudentRepository studentRepository, IProjectRepository projectRepository, ILogger<AddStudendCommandHandler> logger)
    {
        _logger = logger;
        _studentRepository = studentRepository;
        _projectRepository = projectRepository;
    }

    public async Task<AddStudentResponse> Handle(AddStudentCommand command, CancellationToken cancellationToken)
    {
        var validator = new AddStudentValidator();
        var resultValidation = await validator.ValidateAsync(command, cancellationToken);

        if (!resultValidation.IsValid)
        {
            _logger.Log(LogLevel.Information, "Given input failed validation:{errors}", resultValidation.Errors);
            return new AddStudentResponse
            {
                Errors = resultValidation.Errors
                    .Select(x => $"Proprietatea {x.PropertyName} este invalida")
                    .ToList(),
                ResponseStatus = ResultStatus.BadRequest
            };
        }

        var student  = await _studentRepository.GetByEmail(command.Email);

        if (student == null)
        {
            return new AddStudentResponse
            {
                Errors = resultValidation.Errors
                    .Select(x => $"Nu exista studentul cu email-ul dat")
                    .ToList(),
                ResponseStatus = ResultStatus.BadRequest
            };
        }

        try
        {
            await _projectRepository.AddStudent(student.Id, command.ProjectId);
            return new AddStudentResponse();

        }
        catch (Exception ex)
        {
            return new AddStudentResponse
            {
                Errors = resultValidation.Errors
                    .Select(x => $"Internal error")
                    .ToList(),
                ResponseStatus = ResultStatus.InternalError
            };

        }
    }
}