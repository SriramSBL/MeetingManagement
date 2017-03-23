using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MM.Core.Entities
{
    public class Minute
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public Agenda Agenda { get; set; }
        public User UserCreated { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public User UserModified { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
    }
}
