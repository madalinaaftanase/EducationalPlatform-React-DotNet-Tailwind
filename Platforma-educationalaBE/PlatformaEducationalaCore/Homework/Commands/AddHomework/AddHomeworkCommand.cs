using System.Collections;
using MediatR;
using Microsoft.Extensions.Logging;
using PlatformaEducationala.Core.Common;
using PlatformaEducationala.Core.Enums;
using PlatformaEducationala.Core.Group.Commands.AddStudentGroup;
using PlatformaEducationala.Core.Repositories;

namespace PlatformaEducationala.Core.Homework.Commands.AddHome
{
    public class AddHomeworkCommand : IRequest<BaseResponse>
    {
        public Guid CurrentUserId { get; set; }
        public Guid GroupId { get; set; }
        public string Name { get; set; }
    }

    public class AddHomeworkCommandHandler : IRequestHandler<AddHomeworkCommand, BaseResponse>
    {
        private readonly IGroupRepository _groupRepository;
        private readonly ILogger _logger;
        private readonly IHomeworkRepository _homeworkRepository;
        private readonly IStudentRepository _studentRepository;
        private readonly ITeacherRepository _teacherRepository;

        public AddHomeworkCommandHandler(ILogger<AddStudentGroupCommandHandler> logger,
            IStudentRepository studentRepository,
            IGroupRepository groupRepository, IHomeworkRepository homeworkRepository,
            ITeacherRepository teacherRepository)
        {
            _groupRepository = groupRepository;
            _homeworkRepository = homeworkRepository;
            _studentRepository = studentRepository;
            _teacherRepository = teacherRepository;
            _logger = logger;
        }

        public async Task<BaseResponse> Handle(AddHomeworkCommand command, CancellationToken cancellationToken)
        {
            var response = new BaseResponse();

            var teacher = await _teacherRepository.GetById(command.CurrentUserId);
            if (teacher == null)
            {
                response.ResponseStatus = ResultStatus.Forbidden;
                return response;
            }

            var group = await _groupRepository.GetById(command.GroupId);
            if (group == null)
            {
                response.ResponseStatus = ResultStatus.BadRequest;
                response.Errors = new List<string> { "Grupa nu are studenti sau nu exista" };
                return response;
            }

            try
            {
                var studentGroups = await _studentRepository.GetStudentsGroup(command.GroupId);
                var tasks = new List<Task>();
                var homeworkName = command.Name;
                studentGroups.ForEach(sg =>
                {
                    var task = _homeworkRepository.AddHomework(teacher.Id, sg.StudentId, homeworkName);
                    tasks.Add(task);
                });
                await Task.WhenAll(tasks);
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
