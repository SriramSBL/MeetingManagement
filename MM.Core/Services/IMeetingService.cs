using MM.Core.Entities;
using MM.Core.QueryOptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MM.Core.Services
{
    public interface IMeetingService
    {
        int Add(Meeting meeting);

        void Update(Meeting meeting);

        void Delete(int id);

        Meeting GetById(int id);

        Meeting GetByName(string name);

        IList<Meeting> GetAllMeetings();

        IList<Meeting> QueryMeetings(MeetingQueryOptions options);

        IList<MeetingMember> GetByMeetingId(int Id);
    }
}
