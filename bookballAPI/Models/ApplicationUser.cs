using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace bookballAPI.Models
{
    public class ApplicationUser : IdentityUser
    {
        [Column(TypeName = "character varying(150)")]
        public string FullName { get; set; }
    }
}