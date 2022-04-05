using Application.Notes;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class NotesController : BaseController
    {
        [HttpGet]
        public async Task<IActionResult> GetNotes()
        {
            return HandleResult(await Mediator.Send(new List.Query { }));
        }

    }
}
