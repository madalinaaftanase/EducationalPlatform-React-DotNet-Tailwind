using MediatR;
using Microsoft.Extensions.Logging;
using PlatformaEducationala.Core.Enums;
using PlatformaEducationala.Core.Group.Commands.Update;
using PlatformaEducationala.Core.Repositories;

namespace PlatformaEducationala.Core.Group.Commands.AddOrUpdate;

public class UpdateCommand : IRequest<UpdateResponse>
{
    public Guid CurrentUser { get; set; }
    public Guid GroupId { get; set; }
    public string Name { get; set; }
}

public class UpdateCommandHandler : IRequestHandler<UpdateCommand, UpdateResponse>
{
    private readonly IGroupRepository _groupRepository;
    private readonly ILogger _logger;
    private readonly ITeacherRepository _teacherRepository;

    public UpdateCommandHandler(IGroupRepository groupRepository, ITeacherRepository teacherRepository,
        ILogger<UpdateCommandHandler> logg
    )
    {
        _teacherRepository = teacherRepository;
        _logger = logg;
        _groupRepository = groupRepository;
    }

    public async Task<UpdateResponse> Handle(UpdateCommand command, CancellationToken cancellationToken)
    {
        var response = new UpdateResponse();
        var group = await _groupRepository.GetById(command.GroupId);

        if (group.TeacherId != command.CurrentUser)
        {
            response.ResponseStatus = ResultStatus.NotAuthorized;
            return response;
        }

        group.Name = command.Name;

        try
        {
            await _groupRepository.Update(group);
            response.Group = group;
            return response;
        }
        catch
        {
            response.ResponseStatus = ResultStatus.InternalError;
            return response;
        }
    }
}