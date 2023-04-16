using MediatR;
using Microsoft.Extensions.Logging;
using PlatformaEducationala.Core.Enums;
using PlatformaEducationala.Core.Repositories;
using PlatformaEducationala.Core.User.Commands.SaveStudentGroup;

namespace PlatformaEducationala.Core.User.Commands.SaveOrUpdateStudentGroup;

public class SaveOrUpdateGroupCommand : IRequest<SaveOrUpdateGroupResponse>
{
    public Guid CurrentUserId { get; set; }
    public Guid OldGroupId { get; set; }
    public Guid NewIdGroup{ get; set; }
    public Guid StudentId { get; set; }
}

public class SaveGroupCommandHandler : IRequestHandler<SaveOrUpdateGroupCommand, SaveOrUpdateGroupResponse>
{
    private readonly IStudentRepository _studentRepository;
    private readonly ILogger _logger;

    public SaveGroupCommandHandler(IStudentRepository studentRepository, ILogger<SaveGroupCommandHandler> logger)
    {
            _logger= logger;
            _studentRepository= studentRepository;
    }

    public async Task<SaveOrUpdateGroupResponse> Handle(SaveOrUpdateGroupCommand command, CancellationToken cancellationToken)
    {
        var result = new SaveOrUpdateGroupResponse();
        var validator = new SaveOrUpdateStudentGroupValidator();
        var resultValidation = await validator.ValidateAsync(command, cancellationToken);

        if (!resultValidation.IsValid)
        {
            result.ResponseStatus = ResultStatus.BadRequest;
            return result;
        }

        var studentTeacher = await _studentRepository.GetTeacher(command.StudentId);

        if (studentTeacher == null || studentTeacher.Id != command.CurrentUserId)
        {
            result.ResponseStatus = ResultStatus.NotAuthorized;
            return result;
        }

        try
        {
            await _studentRepository.SaveOrUpdateGroup(command);
        }
        catch(Exception ex)
        {
            result.Errors = new List<string> { ex.Message };
            result.ResponseStatus = ResultStatus.InternalError;
            return result;
        }

        return result;
    }
}