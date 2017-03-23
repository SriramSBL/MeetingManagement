using MM.Core.Entities;
using MM.Core.QueryOptions;
using System.Collections.Generic;

namespace MM.Core.Repositories
{
    public interface IMeetingRepository
    {
        int Add(Meeting meeting);

        void Update(Meeting meeting);

        void Delete(int id);

        Meeting GetById(int id);

        Meeting GetByName(string name);

        IList<Meeting> GetAllMeetings();

        IList<Meeting> QueryMeetings(MeetingQueryOptions options);

        IList<MeetingMember> GetByMeetingId(int id);
    }
}
