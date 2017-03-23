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
    public class MeetingLocationService : IMeetingLocationService
    {
        private readonly IMeetingLocationRepository _meetingLocationRepository;


        public MeetingLocationService(IMeetingLocationRepository meetingLocationRepository)
        {
            _meetingLocationRepository = meetingLocationRepository;
        }

        public int Add(MeetingLocation meetingLocation)
        {
            return _meetingLocationRepository.Add(meetingLocation);
        }

        public void Delete(int id)
        {
            throw new NotImplementedException();
        }

        public IList<MeetingLocation> GetAllMeetingLocations()
        {
            return _meetingLocationRepository.GetAllMeetingLocations();
        }

        public MeetingLocation GetById(int id)
        {
            throw new NotImplementedException();
        }

        public MeetingLocation GetByName(string name)
        {
            return _meetingLocationRepository.GetByName(name);
        }

        public void Update(MeetingLocation meetingLocation)
        {
            throw new NotImplementedException();
        }
    }
}
