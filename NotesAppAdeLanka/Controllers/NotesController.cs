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

        [HttpPost]
        public async Task<IActionResult> CreateNote(Domain.Notes note)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Note = note }));
        }

        [HttpPut]
        public async Task<IActionResult> UpdateNote(Domain.Notes note)
        {
            return HandleResult(await Mediator.Send(new Update.Command { Note = note }));
        }

    }
}
