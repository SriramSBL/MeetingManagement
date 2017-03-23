using MM.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MM.Core.Services
{
    public interface IMeetingLocationService
    {
        int Add(MeetingLocation meetingLocation);

        void Update(MeetingLocation meetingLocation);

        void Delete(int id);

        MeetingLocation GetById(int id);

        MeetingLocation GetByName(string name);

        IList<MeetingLocation> GetAllMeetingLocations();
    }
}
