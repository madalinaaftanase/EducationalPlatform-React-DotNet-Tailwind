using MediatR;
using Microsoft.Extensions.Logging;
using PlatformaEducationala.Core.Enums;
using PlatformaEducationala.Core.Repositories;

namespace PlatformaEducationala.Core.Group.Queries.GetById;
    public class GetByIdQuery: IRequest<GetByIdResponse>
    {
        public Guid CurrentUserId { get; set; }
        public Guid GroupId { get; set; }
    }

public class GetByIdQueryHandler : IRequestHandler<GetByIdQuery, GetByIdResponse>
{
    private readonly IGroupRepository _groupRepository;
    private readonly ILogger _logger;
    private readonly ITeacherRepository _teacherRepository;

    public GetByIdQueryHandler(IGroupRepository groupRepository, ITeacherRepository teacherRepository,
        ILogger<GetByIdQueryHandler> logg
    )
    {
        _teacherRepository = teacherRepository;
        _logger = logg;
        _groupRepository = groupRepository;
    }
    public async Task<GetByIdResponse> Handle(GetByIdQuery query, CancellationToken cancellationToken)
    {
        var response = new GetByIdResponse();
        var group = await _groupRepository.GetById(query.GroupId);

        if (group.TeacherId != query.CurrentUserId)
        {
            response.ResponseStatus = ResultStatus.NotAuthorized;
        }

        response.Group=group;
        return response;
    }
}
