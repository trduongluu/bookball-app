using System;
using System.Collections.Generic;

namespace bookballAPI.Entities
{
    public partial class Field
    {
        public Field()
        {
            Booking = new HashSet<Booking>();
        }

        public int Id { get; set; }
        public int PitchId { get; set; }
        public string Name { get; set; }
        public int FieldType { get; set; }

        public virtual Pitch Pitch { get; set; }
        public virtual ICollection<Booking> Booking { get; set; }
    }
}
