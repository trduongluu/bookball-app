using System.Collections.Generic;
using System.Linq;
using bookballAPI.Entities;
// using bookballAPI.Models;

namespace bookballAPI.Helpers
{
    public static class ExtensionMethods
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