using MediatR;
using Microsoft.Extensions.Logging;
using PlatformaEducationala.Core.Common;
using PlatformaEducationala.Core.Enums;
using PlatformaEducationala.Core.Repositories;

namespace PlatformaEducationala.Core.Group.Commands.DeleteStudentGroup;

public class DeleteStudentGroupCommand : IRequest<BaseResponse>
{
    public Guid CurrentUserId { get; set; }
    public Guid GroupId { get; set; }
    public Guid StudentId { get; set; }
}

public class DeleteStudentGroupCommandHandler : IRequestHandler<DeleteStudentGroupCommand, BaseResponse>
{
    private readonly ILogger _logger;
    private readonly IGroupRepository _groupRepository;
    private readonly IStudentRepository _studentRepository;
    private readonly ITeacherRepository _teacherRepository;

    public DeleteStudentGroupCommandHandler(IGroupRepository groupRepository,
        ILogger<DeleteStudentGroupCommandHandler> logger,
        IStudentRepository studentRepository,
        ITeacherRepository teacherRepository)
    {
        _logger = logger;
        _groupRepository = groupRepository;
        _teacherRepository = teacherRepository;
        _studentRepository = studentRepository;
    }

    public async Task<BaseResponse> Handle(DeleteStudentGroupCommand command, CancellationToken cancellationToken)
    {
        var response = new BaseResponse();
        var teacher = await _teacherRepository.GetById(command.CurrentUserId);
            
        if (teacher == null)
        {
            response.ResponseStatus = ResultStatus.NotAuthorized;
            return response;
        }

        var group = teacher.Groups.FirstOrDefault(g => g.Id == command.GroupId);
        if (group == null)
        {
            response.ResponseStatus = ResultStatus.NotAuthorized;
            return response;
        }

        try
        {
            await _groupRepository.DeleteStudentGroup(command);
        }
        catch (Exception ex)
        {
            response.ResponseStatus = ResultStatus.InternalError;
            return response;
        }

        return response;
    }
}