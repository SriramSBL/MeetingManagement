using MM.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MM.Core.QueryOptions
{
    public class MeetingQueryOptions
    {
        public int MeetingDate { get; set; }

        public MeetingStatusType MeetingStatusType { get; set; }
    }
}
