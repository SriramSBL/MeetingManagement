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
    public class AgendaController : ApiController
    {

        private readonly IAgendaService _agendaService;

        public AgendaController(IAgendaService agendaService)
        {
            _agendaService = agendaService;
        }



        // GET: api/Agenda
        public IList<Agenda> Get()
        {
            return _agendaService.GetAllAgendas();
        }

        // GET: api/Agenda/5
        public Agenda Get(int id)
        {
            return _agendaService.GetById(id);
        }

        // POST: api/Agenda
        public Agenda Post(Agenda agenda)
        {
            return _agendaService.Add(agenda);
        }
        

        // PUT: api/Agenda/5
        public void Put(Agenda agenda)
        {
            _agendaService.Update(agenda);
        }

        // DELETE: api/Agenda/5
        public void Delete(int id)
        {
            _agendaService.Delete(id);
        }
    }
}
