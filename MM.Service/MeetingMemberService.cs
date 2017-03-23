using MM.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MM.Core.Entities;
using MM.Core.Repositories;

namespace MM.Services
{
    public class MeetingMemberService : IMeetingMemberService
    {
        private readonly IMeetingMemberRepository _meetingMemberRepository;

        public MeetingMemberService(IMeetingMemberRepository meetingMemberRepository)
        {
            _meetingMemberRepository = meetingMemberRepository;
        }
        public int Add(MeetingMember meetingMember)
        {
            return _meetingMemberRepository.Add(meetingMember);
        }

        public void Delete(int id)
        {
            _meetingMemberRepository.Delete(id);
        }

        public IList<MeetingMember> GetAllMeetingMembers()
        {
            return _meetingMemberRepository.GetAllMeetingMembers();
        }

        public MeetingMember GetById(int id)
        {
            return _meetingMemberRepository.GetById(id);
        }

        public void Update(MeetingMember meetingLocation)
        {
            _meetingMemberRepository.Update(meetingLocation);
        }
    }
}
