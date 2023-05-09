using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace PlatformaEducationala.Api.Controllers
{
    [ApiController]
    [Route("/")]
    public class DefaultController : ControllerBase
    {
        [HttpGet]
        public IActionResult Index()
        {
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "../Platforma-educationalaUI/build/index.html");
            return PhysicalFile(filePath, "text/html");
        }
    }
}
