using Application.Core;
using AutoMapper;
using DataAccess;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Notes
{
    public class List
    {
        public class Query : IRequest<Result<List<Domain.Notes>>>
        {
        }

        public class Handler : IRequestHandler<Query, Result<List<Domain.Notes>>>
        {
            private readonly DataContext context;


            public Handler(DataContext context, IMapper mapper)
            {
                this.context = context;

            }

            public async Task<Result<List<Domain.Notes>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var notes = await context.Notes.ToListAsync();

                return Result<List<Domain.Notes>>.Success(notes);
            }
        }
    }
}
