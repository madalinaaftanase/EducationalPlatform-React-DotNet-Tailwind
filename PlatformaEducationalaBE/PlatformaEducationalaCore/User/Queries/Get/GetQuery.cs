
using MediatR;
using PlatformaEducationala.Core.Repositories;
using Serilog;

namespace PlatformaEducationala.Core.User.Queries.Get;

public class GetQuery: IRequest<GetResponse>
{
}

public class GetQueryHndler : IRequestHandler<GetQuery, GetResponse>
{
    private readonly IUserRepository _userRepository;
    private readonly ILogger _logger;

   public GetQueryHndler(IUserRepository userRepository, ILogger logger)
    {
        _userRepository = userRepository;
        _logger = logger;
    }

    public async Task<GetResponse> Handle(GetQuery request, CancellationToken cancellationToken)
    {
        _logger.Information("Exemplu logging");
        var users = await _userRepository.GetAll();

        var result = new GetResponse
        {
            Users = users.Select(user=> new Models.UserDto
            {
                UserName = user.UserName,
            }).ToList(),
        };

        return result;
    }
}
