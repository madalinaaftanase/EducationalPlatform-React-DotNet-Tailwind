using MediatR;
using Microsoft.Extensions.Logging;
using PlatformaEducationala.Core.Repositories;

namespace PlatformaEducationala.Core.Homework.Queries.Get;

public class GetQuery : IRequest<GetResponse>
{
    public Guid CurrentUserId { get; set; }
}

public class GetQueryHndler : IRequestHandler<GetQuery, GetResponse>
{
    private readonly IHomeworkRepository _homeworkRepository;
    private readonly ILogger _logger;


    public GetQueryHndler(IHomeworkRepository homeworkRepository, ILogger<GetQueryHndler> logger)
    {
        _homeworkRepository = homeworkRepository;
        _logger = logger;
    }

    public async Task<GetResponse> Handle(GetQuery query, CancellationToken cancellationToken)
    {
        _logger.LogInformation("Start Handle");

        var result = new GetResponse
        {
            Homeworks = await _homeworkRepository.GetHomeworksByUserId(query.CurrentUserId)
        };

        return result;
    }
}