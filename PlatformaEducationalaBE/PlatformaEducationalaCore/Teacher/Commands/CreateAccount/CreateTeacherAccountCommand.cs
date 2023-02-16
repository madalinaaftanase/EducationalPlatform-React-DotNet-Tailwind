using MediatR;
using PlatformaEducationala.Core.Repositories;
using Serilog;

namespace PlatformaEducationala.Core.Teacher.Commands.CreateAccount
{
    public class CreateTeacherAccountCommand : IRequest<CreateTeacherAccountResponse>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public class CreateTeacherAccountCommandHandler : IRequestHandler<CreateTeacherAccountCommand, CreateTeacherAccountResponse>
    {
        private readonly ITeacherRepository _teacherRepository;
        private readonly ILogger _logger;

        public CreateTeacherAccountCommandHandler(ITeacherRepository teacherRepository, ILogger logger)
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
                _logger.Information("Given input failed validation:{errors}", resultValidation.Errors);
                return new CreateTeacherAccountResponse
                {
                    Errors = resultValidation.Errors
                        .Select(x => $"Property {x.PropertyName} failed vaidation. Error was {x.ErrorMessage}")
                        .ToList(),
                    ResponseStatus = Enums.ResultStatus.BadRequest
                };
            }
            var teacher = await _teacherRepository.GetByEmail(command.Email);

            if (teacher != null)
            {
                _logger.Information("Given Email already exist");
                result.Errors.Add("Email exist already");
                result.ResponseStatus = Enums.ResultStatus.BadRequest;
                return result;
            }
            var passwordHash = BCrypt.Net.BCrypt.HashPassword(command.Password);
            var entity = new PlatformaEducationala.Core.Entities.Teacher
            {
                Email = command.Email,
                FirstName = command.FirstName,
                LastName = command.LastName,
                Password = passwordHash
            };

            try
            {
                await _teacherRepository.AddAsync(entity);
            }
            catch (Exception ex)
            {
                _logger.Error("{method} failed.Account creation failed. Errors: {err}", nameof(_teacherRepository.AddAsync), ex);
                result.Errors.Add("Failed");
                result.ResponseStatus = Enums.ResultStatus.InternalError;
                return result;
            }
            _logger.Information("The account was created succesfully");
            return result;
        }
    }
}
