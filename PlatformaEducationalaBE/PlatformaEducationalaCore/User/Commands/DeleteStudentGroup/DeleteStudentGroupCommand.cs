using MediatR;
using Microsoft.Extensions.Logging;
using PlatformaEducationala.Core.Common;
using PlatformaEducationala.Core.Enums;
using PlatformaEducationala.Core.Repositories;

namespace PlatformaEducationala.Core.User.Commands.DeleteStudentGroup;

public class DeleteStudentGroupCommand : IRequest<BaseResponse>
{
    public Guid CurrentUserId { get; set; }
    public Guid GroupId { get; set; }
    public Guid StudentId { get; set; }
}

public class DeleteStudentGroupCommandHandler : IRequestHandler<DeleteStudentGroupCommand, BaseResponse>
{
    private readonly ILogger _logger;
    private readonly IStudentRepository _studentRepository;

    public DeleteStudentGroupCommandHandler(IStudentRepository studentRepository,
        ILogger<DeleteStudentGroupCommandHandler> logger)
    {
        _logger = logger;
        _studentRepository = studentRepository;
    }

    public async Task<BaseResponse> Handle(DeleteStudentGroupCommand command, CancellationToken cancellationToken)
    {
        var response = new BaseResponse();
        var teacher = await _studentRepository.GetTeacher(command.StudentId);

        if (teacher.Id != command.CurrentUserId)
        {
            response.ResponseStatus = ResultStatus.NotAuthorized;
            return response;
        }

        try
        {
            await _studentRepository.DeleteStudentGroup(command);
        }
        catch (Exception ex)
        {
            response.ResponseStatus = ResultStatus.InternalError;
            return response;
        }

        return response;
    }
}