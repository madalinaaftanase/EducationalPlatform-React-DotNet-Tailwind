
using FluentValidation;

namespace PlatformaEducationala.Core.Teacher.Commands.CreateAccount
{
    public class CreateTeacherAccountValidator: AbstractValidator<CreateTeacherAccountCommand>
    {
        public CreateTeacherAccountValidator()
        {
            RuleFor(createAcoountCommand => createAcoountCommand.Email)
              .NotEmpty()
              .MinimumLength(8)
              .MaximumLength(50);
        }
    }
}
