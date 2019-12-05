using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace bookballAPI.Models
{
    public partial class User
    {
        public User()
        {
            Booking = new HashSet<Booking>();
        }

        public int Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Token { get; set; }

        [JsonIgnore]
        public virtual ICollection<Booking> Booking { get; set; }
    }
}
