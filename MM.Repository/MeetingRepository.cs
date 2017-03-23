using MM.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MM.Core.Entities;
using MM.Core.QueryOptions;
using MM.Repository.EntityFramework;
using MM.Repository.Helpers;
using MM.Core.Exceptions;

namespace MM.Repository
{
    public class MeetingRepository : IMeetingRepository
    {
        private readonly entitymmEntities _meetingDbContext = new entitymmEntities();

        public int Add(Meeting meeting)
        {

            MM_Meeting meetingDbModel = new MM_Meeting()
            {
                CreatedDate=DateTime.UtcNow,
                CreatedUserId=meeting.CreatedUser.Id,
                MeetingLocationId=meeting.Location.Id,
                MeetingStatus= (int)meeting.StatusType,
                StartDateTime= meeting.StartDate,//meeting.StartDate,
                EndDateTime = null,//meeting.EndDate,//DateTime.UtcNow,//meeting.EndDate,
                Subject = meeting.Subject,
                ParentMeetingId = meeting.ParentMeeting == null ? (int?)null : meeting.ParentMeeting.Id
            };

            _meetingDbContext.MM_Meetings.Add(meetingDbModel);

            foreach(MeetingMember memberMember in meeting.Members)
            {
                MM_MeetingMember meetingMemberDbModel = new MM_MeetingMember()
                {
                    UserId= memberMember.Id,
                    MemberAs=(int)memberMember.MemberAs
                };
                meetingDbModel.MM_MeetingMember.Add(meetingMemberDbModel);
            }

            

            foreach (Agenda title in meeting.Titles)
            {
                int parentOrderId = 0;
                if (title.Heading == null)
                {
                    MM_Agenda agenda = new MM_Agenda()
                    {
                        Title = title.Title,
                        SerialId = title.SerialId,
                        OrderId = title.OrderId,
                    };
                    int childOrderId = 0;
                    foreach (Agenda subtitle in title.SubTitles)
                    {
                        MM_Agenda subTitle = new MM_Agenda()
                        {
                            Title = subtitle.Title,
                            SerialId = subtitle.SerialId,
                            OrderId = subtitle.OrderId,
                        };
                        agenda.MM_Agenda1.Add(subTitle);
                    }


                    meetingDbModel.MM_Agenda.Add(agenda);
                }
            }



            try
            {
                _meetingDbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new AddFailedException<Meeting>();
            }


            Console.WriteLine("Log Item is Added.");

            return meetingDbModel.Id;
        }

        public void Delete(int id)
        {
            MM_Meeting meetingDbModel = _meetingDbContext.MM_Meetings.FirstOrDefault(x => x.Id == id);

            if (meetingDbModel == null)
                throw new EntityNotFoundException<Meeting>(id);

            _meetingDbContext.MM_Meetings.Remove(meetingDbModel);
            try
            {
                _meetingDbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new DeleteFailedException<Meeting>(id);
            }


            Console.WriteLine("Log Event  is Deleted.");
        }

        public IList<Meeting> GetAllMeetings()
        {
            Console.WriteLine("Got All Log Events.");

            return _meetingDbContext.MM_Meetings.ToList().Select(e => e.ConvertToMeeting()).ToList();
        }

        public Meeting GetById(int id)
        {
            MM_Meeting meetingDbModel = _meetingDbContext.MM_Meetings.FirstOrDefault(r => r.Id == id);

            if (meetingDbModel == null)
                throw new EntityNotFoundException<Meeting>(id);
            Console.WriteLine("Log Event got by id.");

            return meetingDbModel.ConvertToMeeting();
        }

        public Meeting GetByName(string name)
        {
            throw new NotImplementedException();
        }

        public IList<Meeting> QueryMeetings(MeetingQueryOptions options)
        {

            var queryResult = _meetingDbContext.MM_Meetings.AsQueryable();

            if (options.MeetingStatusType == MeetingStatusType.Started)
                queryResult = queryResult.Where(x => x.MeetingStatus == (int)options.MeetingStatusType);


            IList<MM_Meeting> meetings = queryResult.ToList();

            return meetings.Select(x => x.ConvertToMeeting()).ToList();
        }

        public void Update(Meeting meeting)
        {
            MM_Meeting meetingDbModel = _meetingDbContext.MM_Meetings.Find(meeting.Id);
            if (meetingDbModel == null)
                throw new EntityNotFoundException<Meeting>((int)meeting.Id);

            meetingDbModel.MeetingStatus = (int)meeting.StatusType;
            if (meeting.StatusType==MeetingStatusType.Ended)
                meetingDbModel.EndDateTime = DateTime.UtcNow;
            else { 
                meetingDbModel.EndDateTime = null;
                meetingDbModel.MeetingLocationId = meeting.Location.Id;
                meetingDbModel.MeetingStatus = (int)meeting.StatusType;
                meetingDbModel.StartDateTime = meeting.StartDate;// meeting.StartDate;
                //meetingDbModel.EndDateTime = meeting.EndDate;//meeting.EndDate;
                meetingDbModel.Subject = meeting.Subject;

                IList<MM_MeetingMember> meetingMembers = meetingDbModel.MM_MeetingMember.Select(x => x).ToList();

                //Add meeting members.
                foreach (MeetingMember member in meeting.Members)
                {
                    MM_MeetingMember meetingMemberDbModel = new MM_MeetingMember()
                    {
                        UserId = member.Id,
                        MemberAs = (int)member.MemberAs
                    };
                    meetingDbModel.MM_MeetingMember.Add(meetingMemberDbModel);
                }
            }
            try
            {
                _meetingDbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new UpdateFailedException<Meeting>((int)meeting.Id);
            }
            Console.WriteLine("Log Event is Updated.");
        }


        public IList<MeetingMember> GetByMeetingId(int id)
        {

            return _meetingDbContext.MM_MeetingMembers.ToList().Where(x => x.MeetingId == id).ToList().Select(x => x.ConvertToMeetingMembers()).ToList();



        }
    }
}
