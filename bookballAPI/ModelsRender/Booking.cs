using System;
using System.Collections.Generic;

namespace bookballAPI.ModelsRender
{
    public partial class Booking
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int PitchId { get; set; }
        public DateTime? Day { get; set; }
        public decimal? Price { get; set; }
        public decimal? Paid { get; set; }
        public DateTime? Checkin { get; set; }
        public DateTime? Checkout { get; set; }
        public int TimeslotId { get; set; }
        public short? Status { get; set; }

        public virtual Pitch Pitch { get; set; }
        public virtual Timeslot Timeslot { get; set; }
        public virtual User User { get; set; }
    }
}
