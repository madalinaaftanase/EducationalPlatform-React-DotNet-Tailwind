﻿
using FluentValidation;

namespace PlatformaEducationala.Core.Project.Commands.Update;
    public class SaveValidator: AbstractValidator<SaveCommand>
    {
        public SaveValidator()
        {
            RuleFor(project => project.Name)
                .MinimumLength(8)
                .MaximumLength(50);

            RuleFor(project => project.Grade)
                .GreaterThanOrEqualTo(0)
                .LessThanOrEqualTo(5);
        }
    }
