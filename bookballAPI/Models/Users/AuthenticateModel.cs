using System.ComponentModel.DataAnnotations;

namespace bookballAPI.Models.Users
{
    public class AuthenticateModel
    {
        [Required]
        public string UserName { get; set; }

        [Required]
        public string Password { get; set; }
    }
}