
using MediatR;
using PlatformaEducationala.Core.Entities;
using PlatformaEducationala.Core.Repositories;
using Serilog;
using System.Security.Cryptography;

namespace PlatformaEducationala.Core.User.Commands.CreateAccount;

public class CreateAccountCommand: IRequest<CreateAccountResponse>
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
}

public class CreateAccountCommandHandler : IRequestHandler<CreateAccountCommand, CreateAccountResponse>
{
    private readonly IStudentRepository _studentRepository;
    private readonly ILogger _logger;
    public CreateAccountCommandHandler(IStudentRepository studentRepository, ILogger logger)
    {
        _studentRepository = studentRepository;
        _logger = logger;
    }

    public async Task<CreateAccountResponse> Handle(CreateAccountCommand command, CancellationToken cancellationToken)
    {
        var validator = new CreateAccountValidator();
        var resultValidation = await validator.ValidateAsync(command, cancellationToken);
        var result = new CreateAccountResponse();
        if (!resultValidation.IsValid)
        {
            _logger.Information("Given input failed validation:{errors}", resultValidation.Errors);
            return new CreateAccountResponse
            {
                Errors = resultValidation.Errors
                    .Select(x => $"Property {x.PropertyName} failed vaidation. Error was {x.ErrorMessage}")
                    .ToList(),
                ResponseStatus = Enums.ResultStatus.BadRequest
            };
        }
        //var existingEmail = await _studentRepository.GetByEmail(command.Email);

        //if(existingEmail!=null)
        //{
        //    _logger.Information("Given Email already exist");
        //    result.Errors.Add("Email exist already");
        //    result.ResponseStatus = Enums.ResultStatus.BadRequest;
        //    return result;
        //}
        var passwordHash = BCrypt.Net.BCrypt.HashPassword(command.Password);
        var entity = new Student
        {
            Email = command.Email,
            FirstName = command.FirstName,
            LastName = command.LastName,
            Password = passwordHash
        };

        try
        {
            await _studentRepository.AddAsync(entity);
        }
        catch (Exception ex)
        {
            _logger.Error("{method} failed.Account creation failed. Errors: {err}", nameof(_studentRepository.AddAsync), ex);
            result.Errors.Add("Failed");
            result.ResponseStatus = Enums.ResultStatus.InternalError;
            return result;
        }
        _logger.Information("The account was created succesfully");
        return result;
    }
}
