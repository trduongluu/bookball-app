using System;
using System.Collections.Generic;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace bookballAPI.Models
{
    public class ApplicationUser : IdentityUser
    {
        public ApplicationUser()
        {
            Booking = new HashSet<Booking>();
        }

        public override string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        // public string Email { get; set; }
        public string Password { get; set; }
        public string Token { get; set; }

        [JsonIgnore]
        public virtual ICollection<Booking> Booking { get; set; }
    }
}