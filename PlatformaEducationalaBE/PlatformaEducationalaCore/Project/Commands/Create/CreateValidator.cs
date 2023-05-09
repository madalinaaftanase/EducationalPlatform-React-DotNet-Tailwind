using FluentValidation;

namespace PlatformaEducationala.Core.Project.Commands.Create;
    public class CreateValidator: AbstractValidator<CreateCommand>
{
    public CreateValidator()
    {
        RuleFor(project => project.Name)
            .MinimumLength(8)
            .MaximumLength(50)
            .NotEmpty();

        RuleFor(project => project.CurrentUserId)
            .NotEmpty();
    }
}
