using FluentValidation;

namespace PlatformaEducationala.Core.User.Commands.SaveOrUpdateStudentGroup;
    public class SaveOrUpdateStudentGroupValidator: AbstractValidator<SaveOrUpdateGroupCommand>
{
    public SaveOrUpdateStudentGroupValidator()
    {
        RuleFor(studentGroup => studentGroup.StudentId)
            .NotEmpty();
        RuleFor(studentGroup => studentGroup.OldGroupId)
            .NotEmpty();
        RuleFor(studentGroup => studentGroup.NewIdGroup)
            .NotEmpty();
    }
    }
