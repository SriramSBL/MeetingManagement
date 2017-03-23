using MM.Core.Entities;
using MM.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Connate.Notification.Entities;
using Connate.FileSystem;


namespace MM.Web.Controllers.WebApi
{
    public class MinuteController : ApiController
    {
        private readonly IMinuteService _minuteService;
        

        public MinuteController(IMinuteService minuteService)
        {
            _minuteService = minuteService;
        }

        // GET: api/Minute/1
        public Minute Get(int agendaId)
        {
            return _minuteService.GetByAgendaId(agendaId);
        }

        // POST: api/Agenda
        public Minute Post(Minute minutes)
        {
            if (minutes.Id == 0 )
            {
                return _minuteService.Add(minutes);
            }else
            {
                _minuteService.Update(minutes);
                return minutes;
            }

        }


        // PUT: api/Minute
        public void Put(Minute minute)
        {
            _minuteService.Update(minute);
        }

        // DELETE: api/Minute/5
        public void Delete(int id)
        {
            _minuteService.Delete(id);
        }
    }
}
