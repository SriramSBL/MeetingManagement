using MM.Core.Entities;
using MM.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MM.Core.QueryOptions;
using MM.Core.Repositories;

namespace MM.Services
{
    public class MeetingService : IMeetingService
    {
        private readonly IMeetingRepository _meetingRepository;
        private readonly IMeetingLocationRepository _meetingLocationRepository;
        private readonly IMeetingMemberRepository _meetingMemberRepository;
        private readonly IAgendaRepository _meetingAgendaRepository;


        public MeetingService(IMeetingRepository meetingRepository, IMeetingLocationRepository meetingLocationRepository, IMeetingMemberRepository meetingMemberRepository, IAgendaRepository meetingAgendaRepository)
        {
            _meetingRepository = meetingRepository;
            _meetingLocationRepository = meetingLocationRepository;
            _meetingMemberRepository = meetingMemberRepository;
            _meetingAgendaRepository = meetingAgendaRepository;
        }


        public int Add(Meeting meeting)
        {
            try
            {
                meeting.Location = _meetingLocationRepository.GetByName(meeting.Location.Name);
                
            }
            catch (Exception e) {
                meeting.Location.Id = _meetingLocationRepository.Add(meeting.Location);
            }
            

            return _meetingRepository.Add(meeting);
        }

        public void Delete(int id)
        {
            _meetingRepository.Delete(id);
        }

        public IList<Meeting> GetAllMeetings()
        {
            return _meetingRepository.GetAllMeetings();
        }

        public Meeting GetById(int id)
        {
            return _meetingRepository.GetById(id);
        }

        public IList<MeetingMember> GetByMeetingId(int Id)
        {
            return _meetingRepository.GetByMeetingId(Id);
        }

        public Meeting GetByName(string name)
        {
            throw new NotImplementedException();
        }

        public IList<Meeting> QueryMeetings(MeetingQueryOptions options)
        {
            return _meetingRepository.QueryMeetings(options);
        }

        public void Update(Meeting meeting)
        {
            try
            {
                meeting.Location = _meetingLocationRepository.GetByName(meeting.Location.Name);
                foreach(MeetingMember member in meeting.Members)
                {
                    if(member.IsAttend == false)
                    {
                        _meetingMemberRepository.Update(member);
                    }
                }
                //foreach(Agenda agenda in meeting.Titles)
                //{
                //    if (agenda.IsCompleted == true)
                //    {
                //        _meetingAgendaRepository.Update(agenda);
                //    }
                //}
            }
            catch (Exception e)
            {
                meeting.Location.Id = _meetingLocationRepository.Add(meeting.Location);
            }

            _meetingRepository.Update(meeting);
        }
    }
}
