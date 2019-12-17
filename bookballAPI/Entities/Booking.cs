﻿using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace bookballAPI.Entities
{
    public partial class Booking
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public int PitchId { get; set; }
        public int TimeslotId { get; set; }
        public DateTime? Day { get; set; }
        public decimal? Price { get; set; }
        public decimal? Paid { get; set; }
        public DateTime? Checkin { get; set; }
        public DateTime? Checkout { get; set; }
        public short? Status { get; set; }

        [JsonIgnore]
        public virtual Pitch Pitch { get; set; }
        [JsonIgnore]
        public virtual Timeslot Timeslot { get; set; }
        [JsonIgnore]
        public virtual User User { get; set; }
    }
}