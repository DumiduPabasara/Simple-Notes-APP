using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if (!context.Notes.Any())
            {


                var activities = new List<Notes>
                {
                    new Notes
                    {
                        Title= "Test Title 1",
                        Description= "Test Description Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non erat vitae nisi placerat efficitur. Mauris vehicula lacinia sem et semper. Vivamus tincidunt turpis et dui ullamcorper, et lacinia ipsum eleifend. Aliquam congue convallis tortor, id interdum ipsum euismod nec. Pellentesque pharetra felis pharetra mauris lobortis, quis tempus ex fringilla. Sed erat magna, interdum sed varius et, ullamcorper in ligula. Vivamus vitae venenatis enim, at dignissim neque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec interdum justo tortor, vitae sollicitudin ligula consectetur at."
                    },

                    new Notes
                    {
                        Title= "Test Title 2",
                        Description= "Test Description Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non erat vitae nisi placerat efficitur. Mauris vehicula lacinia sem et semper. Vivamus tincidunt turpis et dui ullamcorper, et lacinia ipsum eleifend. Aliquam congue convallis tortor, id interdum ipsum euismod nec. Pellentesque pharetra felis pharetra mauris lobortis, quis tempus ex fringilla. Sed erat magna, interdum sed varius et, ullamcorper in ligula. Vivamus vitae venenatis enim, at dignissim neque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec interdum justo tortor, vitae sollicitudin ligula consectetur at."
                    },
                };

                await context.Notes.AddRangeAsync(activities);
                await context.SaveChangesAsync();
            }
        }
    }
}
