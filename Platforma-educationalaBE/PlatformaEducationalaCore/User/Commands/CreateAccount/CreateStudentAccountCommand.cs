﻿using MediatR;
using Microsoft.Extensions.Logging;
using PlatformaEducationala.Core.Entities;
using PlatformaEducationala.Core.Enums;
using PlatformaEducationala.Core.Repositories;

namespace PlatformaEducationala.Core.User.Commands.CreateAccount;

public class CreateStudentAccountCommand : IRequest<CreateStudentAccountResponse>
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
}

public class CreateAccountCommandHandler : IRequestHandler<CreateStudentAccountCommand, CreateStudentAccountResponse>
{
    private readonly ILogger _logger;
    private readonly IStudentRepository _studentRepository;

    public CreateAccountCommandHandler(IStudentRepository studentRepository,
        ILogger<CreateAccountCommandHandler> logger)
    {
        _studentRepository = studentRepository;
        _logger = logger;
    }

    public async Task<CreateStudentAccountResponse> Handle(CreateStudentAccountCommand command,
        CancellationToken cancellationToken)
    {
        var validator = new CreateStudentAccountValidator();
        var resultValidation = await validator.ValidateAsync(command, cancellationToken);
        var result = new CreateStudentAccountResponse();
        if (!resultValidation.IsValid)
        {
            _logger.LogInformation("Given input failed validation:{errors}", resultValidation.Errors);
            return new CreateStudentAccountResponse
            {
                Errors = resultValidation.Errors
                    .Select(x => $"Proprietatea {x.PropertyName} este invalida")
                    .ToList(),
                ResponseStatus = ResultStatus.BadRequest
            };
        }

        var student = await _studentRepository.GetByEmail(command.Email);

        if (student != null)
        {
            _logger.LogInformation("Given Email already exist");
            result.Errors.Add("Adresa de email exista deja");
            result.ResponseStatus = ResultStatus.BadRequest;
            return result;
        }

        var passwordHash = BCrypt.Net.BCrypt.HashPassword(command.Password);
        var entity = new Student
        {
            Email = command.Email,
            Firstname = command.FirstName,
            Lastname = command.LastName,
            Password = passwordHash
        };

        try
        {
            await _studentRepository.AddAsync(entity);
        }
        catch (Exception ex)
        {
            _logger.LogError("{method} failed.Account creation failed. Errors: {err}",
                nameof(_studentRepository.AddAsync), ex);
            result.Errors.Add("Eroare.Contacteaza admin");
            result.ResponseStatus = ResultStatus.InternalError;
            return result;
        }

        _logger.LogInformation("The account was created succesfully");
        return result;
    }
}