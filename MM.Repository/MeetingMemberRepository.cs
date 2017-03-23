using MM.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MM.Core.Entities;
using MM.Repository.EntityFramework;
using MM.Core.Exceptions;
using MM.Repository.Helpers;

namespace MM.Repository
{
    public class MeetingMemberRepository : IMeetingMemberRepository
    {
        private readonly entitymmEntities _meetingDbContext = new entitymmEntities();
        public int Add(MeetingMember meetingMember)
        {
            MM_MeetingMember meetingMemberDbModel = new MM_MeetingMember()
            {
                MeetingId =meetingMember.Meeting.Id,
                UserId=meetingMember.Member.Id,
                MemberAs = (int)meetingMember.MemberAs
            };

            _meetingDbContext.MM_MeetingMembers.Add(meetingMemberDbModel);
            try
            {
                _meetingDbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new AddFailedException<MeetingMember>();
            }


            Console.WriteLine("Log Item is Added.");

            return meetingMemberDbModel.Id;
        }

        public void Delete(int id)
        {
            MM_MeetingMember meetingMemberDbModel = _meetingDbContext.MM_MeetingMembers.FirstOrDefault(x => x.Id == id);

            if (meetingMemberDbModel == null)
                throw new EntityNotFoundException<MeetingMember>(id);

            _meetingDbContext.MM_MeetingMembers.Remove(meetingMemberDbModel);
            try
            {
                _meetingDbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new DeleteFailedException<MeetingMember>(id);
            }


            Console.WriteLine("Log Event  is Deleted.");
        }

        public IList<MeetingMember> GetAllMeetingMembers()
        {
            Console.WriteLine("Got All Log Events.");

            return _meetingDbContext.MM_MeetingMembers.ToList().Select(e => e.ConvertToMeetingMembers()).ToList();
        }

        public MeetingMember GetById(int id)
        {
            MM_MeetingMember meetingMemberDbModel = _meetingDbContext.MM_MeetingMembers.FirstOrDefault(r => r.Id == id);

            if (meetingMemberDbModel == null)
                throw new EntityNotFoundException<MeetingMember>(id);
            Console.WriteLine("Log Event got by id.");

            return meetingMemberDbModel.ConvertToMeetingMembers();
        }

        public void Update(MeetingMember meetingMember)
        {
            MM_MeetingMember meetingMemberDbModel = _meetingDbContext.MM_MeetingMembers.Find(meetingMember.Id);
            if (meetingMemberDbModel == null)
                throw new EntityNotFoundException<MeetingMember>(meetingMember.Id);

            //meetingMemberDbModel.MeetingId = meetingMember.Meeting.Id;
            //meetingMemberDbModel.UserId = meetingMember.Member.Id;
            //meetingMemberDbModel.MemberAs = (int)meetingMember.MemberAs;
            meetingMemberDbModel.IsAttend = meetingMember.IsAttend;
            meetingMemberDbModel.MemberAs = (int)meetingMember.MemberAs;
            try
            {
                _meetingDbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new UpdateFailedException<MeetingMember>(meetingMember.Id);
            }
            Console.WriteLine("Log Event is Updated.");
        }
    }
}
