using System.ComponentModel.DataAnnotations;

namespace bookballAPI.Models.Users
{
    public class RegisterModel
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        [Required]
        public string Username { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}