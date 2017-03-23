using MM.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MM.Core.Services
{
    public interface IMeetingMemberService
    {
        int Add(MeetingMember meetingMember);

        void Update(MeetingMember meetingLocation);

        void Delete(int id);

        MeetingMember GetById(int id);

        IList<MeetingMember> GetAllMeetingMembers();
    }
}
