using MediatR;
using Microsoft.Extensions.Logging;
using PlatformaEducationala.Core.Enums;
using PlatformaEducationala.Core.Group.Commands.AddOrUpdate;
using PlatformaEducationala.Core.Group.Models;
using PlatformaEducationala.Core.Repositories;

namespace PlatformaEducationala.Core.Group.Commands.Add;

public class AddCommand : IRequest<AddResponse>
{
    public Guid CurrentUser { get; set; }
    public Guid? GroupId { get; set; }
    public string Name { get; set; }
}

public class AddCommandHandler : IRequestHandler<AddCommand, AddResponse>
{
    private readonly IGroupRepository _groupRepository;
    private readonly ILogger _logger;

    public AddCommandHandler(IGroupRepository groupRepository,ILogger<AddCommandHandler> logg
    )
    {
        _logger = logg;
        _groupRepository = groupRepository;
    }

    public async Task<AddResponse> Handle(AddCommand command, CancellationToken cancellationToken)
    {
        var response = new AddResponse();
        var group = new GroupDto()
        {
            Name = command.Name,
            TeacherId = command.CurrentUser
        };
        
        try
        {
            await _groupRepository.Add(group);
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