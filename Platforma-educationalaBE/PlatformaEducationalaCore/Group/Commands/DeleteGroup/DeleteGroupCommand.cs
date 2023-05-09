
using MediatR;
using Microsoft.Extensions.Logging;
using PlatformaEducationala.Core.Common;
using PlatformaEducationala.Core.Enums;
using PlatformaEducationala.Core.Repositories;

namespace PlatformaEducationala.Core.Group.Commands.DeleteGroup;
    public class DeleteGroupCommand : IRequest<BaseResponse>
    {
        public Guid CurrentUserId { get; set; }
        public Guid GroupId { get; set; }
    }

public class DeleteGroupCommandHandler : IRequestHandler<DeleteGroupCommand, BaseResponse>
{
    private readonly IGroupRepository _groupRepository;
    private readonly ILogger _logger;
    public DeleteGroupCommandHandler(IGroupRepository groupRepository, ILogger<DeleteGroupCommandHandler> logger)
    {
        _groupRepository = groupRepository;
        _logger = logger;
}
    public async Task<BaseResponse> Handle(DeleteGroupCommand command, CancellationToken cancellationToken)
    {
        var response = new BaseResponse();
        var group = await _groupRepository.GetById(command.GroupId);

        if (group.TeacherId != command.CurrentUserId)
        {
            response.ResponseStatus = ResultStatus.NotAuthorized;
            return response;
        }

        try
        {
            await _groupRepository.DeleteGroup(command.GroupId);
        }
        catch (Exception ex)
        {
            response.ResponseStatus = ResultStatus.InternalError;
            return response;
        }

        return response;
    }
}
