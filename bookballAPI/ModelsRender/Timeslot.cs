using System;
using System.Collections.Generic;

namespace bookballAPI.ModelsRender
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

        public virtual Pitch Pitch { get; set; }
        public virtual ICollection<Booking> Booking { get; set; }
    }
}
