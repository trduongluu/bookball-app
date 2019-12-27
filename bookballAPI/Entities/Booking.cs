using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace bookballAPI.Entities
{
    public partial class Booking
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public int FieldId { get; set; }
        public string TimeSlot { get; set; }
        public DateTime Day { get; set; }
        public long Price { get; set; }
        public long? Paid { get; set; }
        public DateTime? Checkin { get; set; }
        public DateTime? Checkout { get; set; }
        public short Status { get; set; }

        [JsonIgnore]
        public virtual Field Field { get; set; }
        [JsonIgnore]
        public virtual User User { get; set; }
    }
}
