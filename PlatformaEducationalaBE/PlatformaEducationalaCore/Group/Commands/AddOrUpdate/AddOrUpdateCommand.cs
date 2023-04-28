using MediatR;
using Microsoft.Extensions.Logging;
using PlatformaEducationala.Core.Enums;
using PlatformaEducationala.Core.Group.Models;
using PlatformaEducationala.Core.Repositories;

namespace PlatformaEducationala.Core.Group.Commands.AddOrUpdate;

public class AddOrUpdateCommand : IRequest<AddOrUpdateResponse>
{
    public Guid CurrentUser { get; set; }
    public Guid GroupId { get; set; }
    public string Name { get; set; }
}

public class AddOrUpdateCommandHandler : IRequestHandler<AddOrUpdateCommand, AddOrUpdateResponse>
{
    private readonly IGroupRepository _groupRepository;
    private readonly ILogger _logger;
    private readonly ITeacherRepository _teacherRepository;

    public AddOrUpdateCommandHandler(IGroupRepository groupRepository, ITeacherRepository teacherRepository,
        ILogger<AddOrUpdateCommandHandler> logg
    )
    {
        _teacherRepository = teacherRepository;
        _logger = logg;
        _groupRepository = groupRepository;
    }

    public async Task<AddOrUpdateResponse> Handle(AddOrUpdateCommand command, CancellationToken cancellationToken)
    {
        var response = new AddOrUpdateResponse();
        var group = await _groupRepository.GetById(command.GroupId);

        if (group == null)
        {
            response.ResponseStatus = ResultStatus.NotFound;
            return response;
        }

        if (group.TeacherId != command.CurrentUser)
        {
            response.ResponseStatus = ResultStatus.NotAuthorized;
            return response;
        }
        group.Name = command.Name;
        try
        {
            await _groupRepository.AddOrUpdate(group);
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