using System;
using System.Linq;

using MM.Core.Entities;
using MM.Repository.EntityFramework;

namespace MM.Repository.Helpers
{
	public static class MapperHelper
	{
		
		public static User ConvertToUser(this MM_User userDbModel)
		{
			return new User()
			{
				Id = userDbModel.Id,
				Name = userDbModel.Name,
				Email = userDbModel.Email
			};
		}

		
		public static Meeting ConvertToMeeting(this MM_Meeting meetingDbModel)
		{
			return new Meeting()
			{
				Id = meetingDbModel.Id,
				EndDate = meetingDbModel.EndDateTime.GetValueOrDefault(),
				StartDate = meetingDbModel.StartDateTime.GetValueOrDefault(),
				Location = meetingDbModel.MM_MeetingLocation.ConvertToMeetingLocation(),
				StatusType = (MeetingStatusType)meetingDbModel.MeetingStatus,
				Subject = meetingDbModel.Subject,
				CreatedDate = meetingDbModel.CreatedDate.GetValueOrDefault(),
				CreatedUser = meetingDbModel.MM_User.ConvertToUser(),
				Members = meetingDbModel.MM_MeetingMember.Select(x => x.ConvertToMeetingMembers()).ToList(),
                Titles= meetingDbModel.MM_Agenda.Select(x=>x.ConvertToAgendas()).ToList(),
                ParentMeeting = meetingDbModel.ParentMeetingId == null ? null : new Meeting() { Id = (int)meetingDbModel.Id },
                //Where(y=>y.HeadingId==null).
            };
		}

		public static MeetingLocation ConvertToMeetingLocation(this MM_MeetingLocation meetingLocationDbModel)
		{
			return new MeetingLocation()
			{
				Id = meetingLocationDbModel.Id,
				Name = meetingLocationDbModel.LocationName
			};
		}

		public static MeetingMember ConvertToMeetingMembers(this MM_MeetingMember meetingMemberDbModel)
		{
			return new MeetingMember()
			{
				Id = meetingMemberDbModel.Id,
				MemberAs = (MeetingMemberType)meetingMemberDbModel.MemberAs,
				Member = meetingMemberDbModel.MM_User.ConvertToUser(),
                IsAttend = meetingMemberDbModel.IsAttend
            };
		}

        public static Minute ConvertToMinutes(this MM_Minute minuteDbModel)
        {
            return new Minute()
            {
                Id = minuteDbModel.Id,
                Title = minuteDbModel.Title,
                //Agenda = minuteDbModel.MM_Agenda.ConvertToAgendas(),
                UserCreated = minuteDbModel.MM_User.ConvertToUser(),
                CreatedDate = minuteDbModel.CreatedDate,
                UserModified = minuteDbModel.ModifiedBy == null ? null : new User() { Id = (int)minuteDbModel.MM_User.Id },
                ModifiedDate = minuteDbModel.ModifiedDate
            };
        }

        public static Agenda ConvertToAgendas(this MM_Agenda agendaDbModel)
        {
            return new Agenda()
            {
                Id = agendaDbModel.Id,
                Title = agendaDbModel.Title,
                //Heading= agendaDbModel.HeadingId==null ? null : agendaDbModel.MM_Agenda2.ConvertToAgendas(),
                //Heading = agendaDbModel.HeadingId == null ? null : new Agenda() { Id = 0 },
                //new Agenda() { Id = (int)agendaDbModel.HeadingId }
                Heading = agendaDbModel.HeadingId == null ? null : new Agenda() { Id = (int)agendaDbModel.HeadingId },
                //Meeting = agendaDbModel.MM_Meeting.ConvertToMeeting(),
                SubTitles = agendaDbModel.MM_Agenda1.Select(x => x.ConvertToAgendas()).ToList(),
                SerialId=agendaDbModel.SerialId,
                OrderId=agendaDbModel.OrderId.GetValueOrDefault(),
                IsCompleted = agendaDbModel.IsCompleted,
                AgendaMinute = agendaDbModel.MM_Minute.Select(x=>x.ConvertToMinutes()).ToList()
            };
        }

        
    }
}
