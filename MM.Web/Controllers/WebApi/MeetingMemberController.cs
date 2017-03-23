using MM.Core.Entities;
using MM.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MM.Web.Controllers.WebApi
{
    public class MeetingMemberController : ApiController
    {

        private readonly IMeetingMemberService _meetingMemeberService;

        private readonly IMeetingService _meetingService;

        public MeetingMemberController(IMeetingMemberService meetingMemeberService, IMeetingService meetingService)
        {
            _meetingMemeberService = meetingMemeberService;
            _meetingService = meetingService;
        }


        // GET: api/Agenda
        public IList<MeetingMember> Get()
        {
            return _meetingMemeberService.GetAllMeetingMembers();
        }

        // GET: api/Agenda/5
        [Route("api/GetMeetingMembers/")]
        public IList<MeetingMember> Post(Meeting meeting)
        {
            return _meetingService.GetByMeetingId(meeting.Id);
        }

        // POST: api/Agenda
        public void Post(MeetingMember agenda)
        {
            _meetingMemeberService.Add(agenda);
        }


        // PUT: api/Agenda/5
        public void Put(MeetingMember agenda)
        {
            _meetingMemeberService.Update(agenda);
        }

        // DELETE: api/Agenda/5
        public void Delete(int id)
        {
            _meetingMemeberService.Delete(id);
        }
    }
}
