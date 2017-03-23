using MM.Core.Entities;
using System.Collections.Generic;

namespace MM.Core.Repositories
{
    public interface IMeetingMemberRepository
    {
        int Add(MeetingMember meetingMember);

        void Update(MeetingMember meetingMember);

        void Delete(int id);

        MeetingMember GetById(int id);

        IList<MeetingMember> GetAllMeetingMembers();
    }
}
