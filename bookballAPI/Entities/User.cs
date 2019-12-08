using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;

namespace bookballAPI.Entities
{
    public class User : IdentityUser
    {
        public User()
        {
            Booking = new HashSet<Booking>();
        }
        // public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        // public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public string Token { get; set; }

        [JsonIgnore]
        public virtual ICollection<Booking> Booking { get; set; }
    }
}