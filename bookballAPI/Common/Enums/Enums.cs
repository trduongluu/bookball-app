using System.ComponentModel.DataAnnotations;

namespace bookballAPI.Common.Enums
{
    public enum UserStatus
    {
        [Display(Name = "NotActive")]
        NotActive,
        [Display(Name = "Active")]
        Active,
        [Display(Name = "Online")]
        Online,
        [Display(Name = "Blocked")]
        Blocked
    }

    public enum UserClass
    {
        [Display(Name = "Player")]
        Player,
        [Display(Name = "Pitcher")]
        Pitcher,
        [Display(Name = "Admin")]
        Admin
    }

    public enum UserRole
    {

    }

    public enum BookingStatus
    {
        [Display(Name = "Waiting")]
        Waiting = 1,
        [Display(Name = "Booked")]
        Booked,
        [Display(Name = "Canceled")]
        Canceled
    }

    public enum TimeSlotStatus
    {
        [Display(Name = "Available")]
        Available = 1,
        [Display(Name = "NotAvailable")]
        NotAvailable
    }
}