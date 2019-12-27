using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace bookballAPI.Entities
{
    public partial class Pitch
    {
        public Pitch()
        {
            Field = new HashSet<Field>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Location { get; set; }
        public string Description { get; set; }

        [JsonIgnore]
        public virtual ICollection<Field> Field { get; set; }
    }
}
