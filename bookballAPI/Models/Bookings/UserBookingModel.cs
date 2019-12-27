using System;
using System.ComponentModel.DataAnnotations;

namespace bookballAPI.Models.Bookings
{
    public class UserBookingModel
    {
        // [Required]
        // public string UserId { get; set; }
        [Required]
        public int FieldId { get; set; }
        [Required]
        public string TimeSlot { get; set; }
        [Required]
        public DateTime Day { get; set; }
        [Required]
        public long Price { get; set; }
        public long? Paid { get; set; }
        // [Required]
        // public short Status { get; set; }
    }
}