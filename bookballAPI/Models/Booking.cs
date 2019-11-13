using System;
using System.Collections.Generic;

namespace bookballAPI.Models
{
    public partial class Booking
    {
        public int Id { get; set; }
        public int? UserId { get; set; }
        public int? PitchId { get; set; }
        public TimeSpan? Timeslot { get; set; }
        public DateTime? Day { get; set; }
        public decimal? Price { get; set; }
        public decimal? Paid { get; set; }
        public DateTime? Checkin { get; set; }
        public DateTime? Checkout { get; set; }

        public virtual Pitch Pitch { get; set; }
        public virtual User User { get; set; }
    }
}
