using MediatR;
using Microsoft.Extensions.Logging;
using PlatformaEducationala.Core.Common;
using PlatformaEducationala.Core.Enums;
using PlatformaEducationala.Core.Repositories;

namespace PlatformaEducationala.Core.Homework.Commands.UpdateHomework
{
    public class UpdateHomeworkCommand : IRequest<BaseResponse>
    {
        public Guid CurrentUserId { get; set; }
        public Guid HomeworkId { get; set; }
        public Guid ProjectId { get; set; }
    }

    public class UpdateHomeworkCommandHandler : IRequestHandler<UpdateHomeworkCommand, BaseResponse>
    {
        private readonly ILogger _logger;
        private readonly IHomeworkRepository _homeworkRepository;

        public UpdateHomeworkCommandHandler(ILogger<UpdateHomeworkCommand> logger,
            IStudentRepository studentRepository,
            IGroupRepository groupRepository, IHomeworkRepository homeworkRepository,
            ITeacherRepository teacherRepository)
        {
            _homeworkRepository = homeworkRepository;
            _logger = logger;
        }

        public async Task<BaseResponse> Handle(UpdateHomeworkCommand command, CancellationToken cancellationToken)
        {
            var response = new BaseResponse();

            var homeworks = await _homeworkRepository.GetHomeworksByUserId(command.CurrentUserId);

            var targetedHomework = homeworks.Find(h => h.Id == command.HomeworkId);
            if (targetedHomework == null)
            {
                response.ResponseStatus = ResultStatus.Forbidden;
                return response;
            }
             
            try
            {
                targetedHomework.ProjectId = command.ProjectId;
                await _homeworkRepository.Update(targetedHomework);
            }
            catch (Exception ex)
            {
                response.ResponseStatus = ResultStatus.InternalError;
                return response;
            }

            return response;
        }
    }
}
