using MediatR;
using Microsoft.Extensions.Logging;
using PlatformaEducationala.Core.Common;
using PlatformaEducationala.Core.Enums;
using PlatformaEducationala.Core.Repositories;

namespace PlatformaEducationala.Core.Group.Commands.AddStudentGroup;

public class AddStudentGroupCommand : IRequest<BaseResponse>
{
    public Guid CurrentUserId { get; set; }
    public Guid GroupId { get; set; }
    public string StudentEmail { get; set; }
}

public class AddStudentGroupCommandHandler : IRequestHandler<AddStudentGroupCommand, BaseResponse>
{
    private readonly IGroupRepository _groupRepository;
    private readonly ILogger _logger;
    private readonly IStudentRepository _studentRepository;

    public AddStudentGroupCommandHandler(ILogger<AddStudentGroupCommandHandler> logger,
        IGroupRepository groupRepository, IStudentRepository studentRepository)
    {
        _groupRepository = groupRepository;
        _studentRepository = studentRepository;
        _logger = logger;
    }

    public async Task<BaseResponse> Handle(AddStudentGroupCommand command, CancellationToken cancellationToken)
    {
        var response = new BaseResponse();

        var student = await _studentRepository.GetByEmail(command.StudentEmail);

        try
        {
            await _groupRepository.AddStudentGroup(student.Id, command.GroupId);
        }
        catch (Exception ex)
        {
            response.ResponseStatus = ResultStatus.InternalError;
            return response;
        }

        return response;
    }
}