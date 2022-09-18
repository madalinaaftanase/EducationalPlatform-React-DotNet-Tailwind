
using FluentValidation;

namespace PlatformaEducationala.Core.User.Commands.CreateAccount
{
    public class CreateStudentAccountValidator : AbstractValidator<CreateStudentAccountCommand>
    {
        public CreateStudentAccountValidator()
        {
            RuleFor(createAcoountCommand => createAcoountCommand.Email)
               .NotEmpty()
               .MinimumLength(8)
               .MaximumLength(50);
        }
    }
}
