using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace bookballAPI.Entities
{
    public partial class Timeslot
    {
        public Timeslot()
        {
            Booking = new HashSet<Booking>();
        }

        public int Id { get; set; }
        public int? PitchId { get; set; }
        public TimeSpan? Timeframe { get; set; }

        [JsonIgnore]
        public virtual Pitch Pitch { get; set; }
        [JsonIgnore]
        public virtual ICollection<Booking> Booking { get; set; }
    }
}
