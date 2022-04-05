using Application.Core;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{

        [Route("api/[controller]")]
        [ApiController]
        public class BaseController : ControllerBase
        {

            private IMediator mediator;

            protected IMediator Mediator => mediator ??= HttpContext.RequestServices.GetService<IMediator>();

            protected ActionResult HandleResult<T>(Result<T> result)
            {

                if (result == null) return NotFound();
                if (result.IsSuccess && result.Value != null)
                    return Ok(result.Value);
                if (result.IsSuccess && result.Value == null)
                    return NotFound();
                return BadRequest(result.Error);
            }
        }
}
