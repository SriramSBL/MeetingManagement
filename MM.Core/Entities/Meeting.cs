using System;
using System.Collections.Generic;

namespace MM.Core.Entities
{
    public class Meeting
    {
        public int Id { get; set; }

        public string Subject { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public DateTime CreatedDate { get; set; }

        public User CreatedUser { get; set; }

        public MeetingLocation Location { get; set; }

        public MeetingStatusType StatusType { get; set; }

        public IList<MeetingMember> Members { get; set; }

        public IList<Agenda> Titles { get; set; }

        public Meeting ParentMeeting { get; set; }

        public Meeting() {
            Members = new List<MeetingMember>();
            Titles = new List<Agenda>();
        }
    }
}
