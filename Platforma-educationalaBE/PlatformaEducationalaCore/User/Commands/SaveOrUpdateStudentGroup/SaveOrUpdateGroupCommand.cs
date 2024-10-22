﻿using MediatR;
using Microsoft.Extensions.Logging;
using PlatformaEducationala.Core.Enums;
using PlatformaEducationala.Core.Repositories;
using PlatformaEducationala.Core.User.Commands.SaveStudentGroup;

namespace PlatformaEducationala.Core.User.Commands.SaveOrUpdateStudentGroup;

public class SaveOrUpdateGroupCommand : IRequest<SaveOrUpdateGroupResponse>
{
    public Guid CurrentUserId { get; set; }
    public Guid OldGroupId { get; set; }
    public Guid NewIdGroup{ get; set; }
    public Guid StudentId { get; set; }
}

public class SaveGroupCommandHandler : IRequestHandler<SaveOrUpdateGroupCommand, SaveOrUpdateGroupResponse>
{
    private readonly IStudentRepository _studentRepository;
    private readonly ITeacherRepository _teacherRepository;
    private readonly ILogger _logger;

    public SaveGroupCommandHandler(IStudentRepository studentRepository, ILogger<SaveGroupCommandHandler> logger, ITeacherRepository teacherRepository)
    {
            _logger= logger;
            _studentRepository= studentRepository;
            _teacherRepository= teacherRepository;
    }

    public async Task<SaveOrUpdateGroupResponse> Handle(SaveOrUpdateGroupCommand command, CancellationToken cancellationToken)
    {
        var result = new SaveOrUpdateGroupResponse();
        var validator = new SaveOrUpdateStudentGroupValidator();
        var resultValidation = await validator.ValidateAsync(command, cancellationToken);

        if (!resultValidation.IsValid)
        {
            result.ResponseStatus = ResultStatus.BadRequest;
            result.Errors = new List<string> { "Input invalid" };
            return result;
        }

        var studentTeacher = await _teacherRepository.GetById(command.CurrentUserId);

        if (studentTeacher == null || studentTeacher.Id != command.CurrentUserId)
        {
            result.ResponseStatus = ResultStatus.NotAuthorized;
            result.Errors = new List<string> { "Nu esti autorizat" };
            return result;
        }

        var studentsGroup = await _studentRepository.GetStudentsGroup(command.NewIdGroup);

        if (studentsGroup.Count > 15)
        {
            result.ResponseStatus = ResultStatus.BadRequest;
            result.Errors = new List<string> { "Grupa a atins numarul maxim" };
            return result;
        }

        try
        {
            await _studentRepository.SaveOrUpdateGroup(command);
        }
        catch(Exception ex)
        {
            result.Errors = new List<string> { "Eroare. Contacteaza admin." };
            result.ResponseStatus = ResultStatus.InternalError;
            return result;
        }

        return result;
    }
}