using MM.Core.Entities;
using MM.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Connate.FileSystem;
using Connate.Notification.Services;
using System.Configuration;
using Connate.Notification.Entities;


namespace MM.Web.Controllers.WebApi
{

    public class LocationController : ApiController
    {
        private readonly IMeetingLocationService _meetingLocationService;
        private readonly EmailService _emailService;

        public LocationController(IMeetingLocationService meetingLocationService)
        {
            _meetingLocationService = meetingLocationService;
        }
     

        // GET: api/Location
        public IEnumerable<MeetingLocation> Get()
        {
            return _meetingLocationService.GetAllMeetingLocations();
        }

        // GET: api/Location/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Location
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Location/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Location/5
        public void Delete(int id)
        {
        }
        public void EmailService()
        {

            EmailService _emailService = new EmailService(ConfigurationManager.AppSettings["SmtpServer"], 
                int.Parse(ConfigurationManager.AppSettings["Port"]),
                ConfigurationManager.AppSettings["SenderId"],
                ConfigurationManager.AppSettings["CreEmail"],
                ConfigurationManager.AppSettings["CrePassword"], false, true);



        }
        
    }

}
