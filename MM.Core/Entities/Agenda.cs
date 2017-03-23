using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MM.Core.Entities
{
    public class Agenda
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public Meeting Meeting { get; set; }
        public Agenda Heading { get; set; }
        public string SerialId { get; set; }

        public int OrderId { get; set; }
        public Nullable<bool> IsCompleted { get; set; }

        public IList<Agenda> SubTitles { get; set; }
        public IList<Minute> AgendaMinute { get; set; }

        public Agenda()
        {
            SubTitles = new List<Agenda>();
            AgendaMinute = new List<Minute>();
        }

    }
}
