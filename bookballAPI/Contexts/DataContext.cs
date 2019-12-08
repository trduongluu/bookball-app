using bookballAPI.Entities;
using Microsoft.EntityFrameworkCore;

namespace bookballAPI.Contexts
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
    }
}