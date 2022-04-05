using Application.Core;
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
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Domain.Notes Note { get; set; }
        }

        public class CommandValidator : AbstractValidator<Domain.Notes>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Title).NotEmpty();
                RuleFor(x => x.Description).NotEmpty();
            }
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
                context.Notes.Add(request.Notes);

                var result = await context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to create note !");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
