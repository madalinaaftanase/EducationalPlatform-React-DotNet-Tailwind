using FluentValidation;

namespace PlatformaEducationala.Core.Project.Commands.AddStudent;
    public class AddStudentValidator:AbstractValidator<AddStudentCommand>
    {
        public AddStudentValidator()
        {
        RuleFor(project => project.Email)
            .NotEmpty();
    }
    }
