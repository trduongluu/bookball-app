using System.Collections.Generic;
using System.Linq;
using bookballAPI.Entities;
// using bookballAPI.Models;

namespace bookballAPI.Helpers.Extensions
{
    public static class UserExtensions
    {
        public static IEnumerable<User> WithoutPasswords(this IEnumerable<User> users)
        {
            return users.Select(x => x.WithoutPassword());
        }

        public static User WithoutPassword(this User user)
        {
            user.PasswordHash = null;
            return user;
        }
    }
}