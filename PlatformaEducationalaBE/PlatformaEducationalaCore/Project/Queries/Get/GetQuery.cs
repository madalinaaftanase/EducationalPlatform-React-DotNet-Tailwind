using MediatR;
using PlatformaEducationala.Core.Project.Models;
using PlatformaEducationala.Core.Repositories;
using Serilog;

namespace PlatformaEducationala.Core.Project.Queries.Get
{
    public class GetQuery : IRequest<GetResponse>
    {
        public Guid? CurrentUserId { get; set; } = Guid.Empty;

    }

    public class GetQueryHndler : IRequestHandler<GetQuery, GetResponse>
    {
        private readonly IProjectRepository _projectRepository;
        private readonly ILogger _logger; 


        public GetQueryHndler(IProjectRepository projectRepository , ILogger logger)
        {
            _projectRepository = projectRepository;
            _logger = logger;
        }

        public async Task<GetResponse> Handle(GetQuery request, CancellationToken cancellationToken)
        {
            _logger.Information("Exemplu logging");
            var projects = await _projectRepository.GetAll();

            var result = new GetResponse
            {
                Projects = projects.Select(project => new ProjectDto()
                {
                    Name = project.Name,
                    Xml = project.Xml
                }).ToList(),
            };

            return result;
        }
    }

}
