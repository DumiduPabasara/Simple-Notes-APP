using Application.Core;
using AutoMapper;
using DataAccess;
using FluentValidation;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Notes
{
    public class Update
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Domain.Notes Note { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Note).SetValidator(new NoteValidator());
            }
        }


        public class Handler : IRequestHandler<Command, Result<Unit>>
        {

            private readonly DataContext context;
            private readonly IMapper mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }



            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var note = await context.Notes.FindAsync(request.Note.Id);

                if (note == null) return null;

                mapper.Map(request.Note, note);

                var result = await context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to update note");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
