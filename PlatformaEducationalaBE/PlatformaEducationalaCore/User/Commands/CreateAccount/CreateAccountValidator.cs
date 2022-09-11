
using FluentValidation;

namespace PlatformaEducationala.Core.User.Commands.CreateAccount
{
    public class CreateAccountValidator : AbstractValidator<CreateAccountCommand>
    {
        public CreateAccountValidator()
        {
            RuleFor(createAcoountCommand => createAcoountCommand.Email)
               .NotEmpty()
               .MinimumLength(8)
               .MaximumLength(50);
        }
    }
}
