using MM.Core.Entities;
using MM.Core.QueryOptions;
using MM.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Connate.FileSystem.Entities;
using Connate.Notification.Entities;
using Connate.Notification.Services;
using System.Configuration;
using Connate.FileSystem.Converters;
using System.IO;
using System.Web.Hosting;
    

using iTextSharp.tool.xml;

namespace MM.Web.Controllers.WebApi
{
	public class MeetingController : ApiController
	{
		private readonly IMeetingService _meetingService;
		private readonly IMeetingMemberService _meetingMemberService;
        private readonly EmailService _emailService;
        private readonly IUserService _riskUserService;
        private readonly HtmlToPdfConverter _pdfCoverter;
        private readonly Fileshare _Fileshare;

        public MeetingController(IMeetingService meetingService, IMeetingMemberService meetingMemberService, IUserService riskUserService)
        {
            _meetingService = meetingService;
            _meetingMemberService = meetingMemberService;
            _riskUserService = riskUserService;

        }
        // GET: api/Meeting
        public IEnumerable<Meeting> Get()
		{
			return _meetingService.GetAllMeetings();
		}

		// GET: api/Meeting/5
    
		public Meeting Get(int id)
		{
			return _meetingService.GetById(id);
		}

        // POST: api/Meeting
        public void Post(Meeting meeting)
         {
            bool isMeetingRunning = false;
            if (meeting.StatusType == MeetingStatusType.Started)
            {
                IList<Meeting> meetings = _meetingService.GetAllMeetings();
                foreach (Meeting meetingItem in meetings)
                {
                    if (meetingItem.StatusType == MeetingStatusType.Started)
                    {
                        isMeetingRunning = true;
                    }
                }
            }
            if (!isMeetingRunning)
                _meetingService.Add(meeting);

            EmailService _emailService = new EmailService(ConfigurationManager.AppSettings["SmtpServer"], int.Parse(ConfigurationManager.AppSettings["Port"]), ConfigurationManager.AppSettings["SenderId"], ConfigurationManager.AppSettings["CreEmail"], ConfigurationManager.AppSettings["CrePassword"], false, true);
            Email email = new Email();
            email.Subject = "Subject";
            email.Body = Connate.FileSystem.Converters.ViewRenderer.RenderView("~/views/Home/MailBody.cshtml", meeting);
           
            
            //For MM app Member adding
            foreach (var meetingMember in meeting.Members)
            {
              
                if (meetingMember.MemberAs == MeetingMemberType.Attendy || meetingMember.MemberAs == MeetingMemberType.Apology)
                    email.Recipients.Add(_riskUserService.GetById(meetingMember.Id).Email);
                else if (meetingMember.MemberAs == MeetingMemberType.Cc)
                    email.CCs.Add(_riskUserService.GetById(meetingMember.Id).Email);
            }





            //Initialize
            HtmlToPdfConverter _pdfCoverter = new HtmlToPdfConverter();

            //Html to pdf convertion
            string data = Connate.FileSystem.Converters.ViewRenderer.RenderView("~/views/Home/Pdfview.cshtml", meeting);
            Byte[] fileData =  _pdfCoverter.Convert(Connate.FileSystem.Converters.ViewRenderer.RenderView("~/views/Home/Pdfview.cshtml", meeting), "", true);

            string fileName = meeting.Subject + "_" + meeting.Location.Name + ".PDF";

            string filePath = HostingEnvironment.MapPath("~/Uploads/Pdffile/") + fileName;

            FileStream pdfFile = new FileStream(filePath, FileMode.Append);
            pdfFile.Write(fileData, 0, fileData.Length);
            pdfFile.Close();


            email.Attachments.Add(filePath);


           
            _emailService.Send(email);
            //Fileshare _Fileshare = new Fileshare();
            
            //    _Fileshare.CopyFiletoFileshare(fileData, fileName, ConfigurationManager.AppSettings["Protocol"], "p0000001", ConfigurationManager.AppSettings["Domain"], ConfigurationManager.AppSettings["FileshareAppID"], "1", 1, 1);
            
        }


        [Route("api/MeetingQuery/")]
		public IList<Meeting> Post(MeetingQueryOptions options)
		{
			return _meetingService.QueryMeetings(options);
		}


		// PUT: api/Meeting
		public void Put(Meeting meeting)
		{
            //bool isMeetingRunning = false;
            //if (meeting.StatusType == MeetingStatusType.Started)
            //{
            //	IList<Meeting> meetings = _meetingService.GetAllMeetings();
            //	foreach (Meeting meetingItem in meetings)
            //	{
            //		if (meetingItem.StatusType == MeetingStatusType.Started)
            //		{
            //			isMeetingRunning = true;
            //		}
            //	}
            //}
            //if (!isMeetingRunning)
            //{

            //	Meeting oldMeeting = _meetingService.GetById(meeting.Id);

            //	foreach (MeetingMember meetingMember in oldMeeting.Members)
            //		_meetingMemberService.Delete(meetingMember.Id);


            //	_meetingService.Update(meeting);
            //}

            if (meeting.StatusType != MeetingStatusType.Ended)
            {
                Meeting oldMeeting = _meetingService.GetById(meeting.Id);

                foreach (MeetingMember meetingMember in oldMeeting.Members)
                    _meetingMemberService.Delete(meetingMember.Id);
            }

            _meetingService.Update(meeting);
        }

		// DELETE: api/Meeting/5
		public void Delete(int id)
		{
			_meetingService.Delete(id);
		}
	}
}
