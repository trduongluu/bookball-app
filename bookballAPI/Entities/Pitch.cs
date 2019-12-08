using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace bookballAPI.Entities
{
    public partial class Pitch
    {
        public Pitch()
        {
            Booking = new HashSet<Booking>();
            Timeslot = new HashSet<Timeslot>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Location { get; set; }

        [JsonIgnore]
        public virtual ICollection<Booking> Booking { get; set; }
        [JsonIgnore]
        public virtual ICollection<Timeslot> Timeslot { get; set; }
    }
}
