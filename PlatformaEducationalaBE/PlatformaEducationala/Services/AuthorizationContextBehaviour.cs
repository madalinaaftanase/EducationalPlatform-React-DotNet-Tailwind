//using MediatR;
//using Microsoft.Graph;
//using System.Diagnostics;

//namespace PlatformaEducationala.Api.Services
//{
//    public class AuthorizationContextBehaviour<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse>
//        where TRequest : BaseRequest<TResponse>
//    {
//        private readonly IHttpContextAccessor _contextAccessor;
//        private readonly ILogger<TRequest> _logger;

//        public AuthorizationContextBehaviour(IHttpContextAccessor contextAccessor, ILogger<TRequest> logger)
//        {
//            _contextAccessor = contextAccessor;
//            _logger = logger;
//        }

//        [DebuggerStepThrough]
//        public async Task<TResponse> Handle(TRequest request, CancellationToken cancellationToken, RequestHandlerDelegate<TResponse> next)
//        {
//            _logger.LogInformation("Set authorization context for {query}", request.GetType().Name);
//            var userIdClaim = _contextAccessor.HttpContext.User.Claims.FirstOrDefault(claim => claim.Type == "userId");

//            if (userIdClaim == null)
//            {
//                _logger.LogInformation("{variable} is null", nameof(userIdClaim));
//                throw new UnauthorizedAccessException("User doesn't have the necessary role");
//            }
//            //request.UserId = Guid.Parse(userIdClaim.Value);

//            var response = await next();
//            return response;
//        }
//    }
//}
