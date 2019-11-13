using System;
using System.Collections.Generic;

namespace bookballAPI.Models
{
    public partial class Timeslot
    {
        public int Id { get; set; }
        public int? PitchId { get; set; }
        public TimeSpan? Timeslot1 { get; set; }

        public virtual Pitch Pitch { get; set; }
    }
}
