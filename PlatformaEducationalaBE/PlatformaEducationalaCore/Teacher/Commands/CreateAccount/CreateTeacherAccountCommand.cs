using MediatR;
using Microsoft.Extensions.Logging;
using PlatformaEducationala.Core.Repositories;

namespace PlatformaEducationala.Core.Teacher.Commands.CreateAccount
{
    public class CreateTeacherAccountCommand : IRequest<CreateTeacherAccountResponse>
    {
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public class CreateTeacherAccountCommandHandler : IRequestHandler<CreateTeacherAccountCommand, CreateTeacherAccountResponse>
    {
        private readonly ITeacherRepository _teacherRepository;
        private readonly ILogger _logger;

        public CreateTeacherAccountCommandHandler(ITeacherRepository teacherRepository, ILogger<CreateTeacherAccountCommandHandler> logger)
        {
            _teacherRepository = teacherRepository;
            _logger = logger;
        }

        public async Task<CreateTeacherAccountResponse> Handle(CreateTeacherAccountCommand command, CancellationToken cancellationToken)
        {
            var validator = new CreateTeacherAccountValidator();
            var resultValidation = await validator.ValidateAsync(command, cancellationToken);
            var result = new CreateTeacherAccountResponse();

            if (!resultValidation.IsValid)
            {
                _logger.LogInformation("Given input failed validation:{errors}", resultValidation.Errors);
                return new CreateTeacherAccountResponse
                {
                    Errors = resultValidation.Errors
                        .Select(x => $"Proprietatea {x.PropertyName} este invalida")
                        .ToList(),
                    ResponseStatus = Enums.ResultStatus.BadRequest
                };
            }
            var teacher = await _teacherRepository.GetByEmail(command.Email);

            if (teacher != null)
            {
                _logger.LogInformation("Given Email already exist");
                result.Errors.Add("Adresa de email exista deja");
                result.ResponseStatus = Enums.ResultStatus.BadRequest;
                return result;
            }
            var passwordHash = BCrypt.Net.BCrypt.HashPassword(command.Password);
            var entity = new PlatformaEducationala.Core.Entities.Teacher
            {
                Email = command.Email,
                Firstname = command.Firstname,
                Lastname = command.Lastname,
                Password = passwordHash
            };

            try
            {
                await _teacherRepository.AddAsync(entity);
            }
            catch (Exception ex)
            {
                _logger.LogError("{method} failed.Account creation failed. Errors: {err}", nameof(_teacherRepository.AddAsync), ex);
                result.Errors.Add("Eroare.Contacteaza admin");
                result.ResponseStatus = Enums.ResultStatus.InternalError;
                return result;
            }
            _logger.LogInformation("The account was created succesfully");
            return result;
        }
    }
}
