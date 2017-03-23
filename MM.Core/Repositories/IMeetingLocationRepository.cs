using MM.Core.Entities;
using System.Collections.Generic;

namespace MM.Core.Repositories
{
    public interface IMeetingLocationRepository
    {
        int Add(MeetingLocation meetingLocation);

        void Update(MeetingLocation meetingLocation);

        void Delete(int id);

        MeetingLocation GetById(int id);

        MeetingLocation GetByName(string name);

        IList<MeetingLocation> GetAllMeetingLocations();
    }
}
