using Application.Core;
using DataAccess;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Notes
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {

            public Guid Id { get; set; }

        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext context;

            public Handler(DataContext context)
            {
                this.context = context;
            }


            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var note = await context.Notes.FindAsync(request.Id);

                context.Remove(note);

                var result = await context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to delete the note !");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
