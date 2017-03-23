using MM.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MM.Core.Entities;
using MM.Core.Repositories;
using MM.Core.QueryOptions;

namespace MM.Service
{
    public class AgendaService : IAgendaService
    {
        private readonly IAgendaRepository _agendaRepository;

        public AgendaService(IAgendaRepository agendaRepository)
        {


            _agendaRepository = agendaRepository;
        }


        public Agenda Add(Agenda agenda)
        {
            Agenda maxAgenda;
            //string maxAgenda = "0.0";

            //if (agenda.Heading != null)
            //{
            //    IList<Agenda> subTitles = _agendaRepository.GetById(agenda.Heading.Id).SubTitles;

            //    foreach (var agendaItem in subTitles)
            //    {
            //        if (maxAgenda < agendaItem.SerialId)
            //            maxAgenda = agendaItem.SerialId;
            //    }

            //    if (maxAgenda != 0.0)
            //        maxAgenda = maxAgenda+0.1;
            //    else
            //        maxAgenda = 0.1;

            //}
            //else
            //{
            //    IList<Agenda> subTitles = _agendaRepository.GetByHeadingId(agenda.Meeting.Id);
            //    foreach (var agendaItem in subTitles)
            //    {
            //        if (maxAgenda < agendaItem.SerialId)
            //            maxAgenda = agendaItem.SerialId;
            //    }
            //    if (maxAgenda != 0.0)
            //        maxAgenda += 1;
            //    else
            //        maxAgenda = 1;
            //}

            //if (agenda.Heading == null)
            //{
            //    maxAgenda = _agendaRepository.GetMaxOrderByMeeting(new Core.QueryOptions.AgendaQueryOptions() { MeetingId = agenda.Meeting.Id});
                
            //}
            //else
            //{
            //    maxAgenda = _agendaRepository.GetMaxOrderByMeeting(new Core.QueryOptions.AgendaQueryOptions() { AgendaId = agenda.Heading.Id, MeetingId = agenda.Meeting.Id });
            //}



            //agenda.SerialId = maxAgenda.SerialId + 1;
            //agenda.OrderId = maxAgenda.OrderId + 1;

            return _agendaRepository.Add(agenda);
        }

        public void Delete(int id)
        {
            _agendaRepository.Delete(id);
        }

        public IList<Agenda> GetAllAgendas()
        {
           return _agendaRepository.GetAllAgendas();
        }

        public Agenda GetById(int id)
        {
            return _agendaRepository.GetById(id);
        }

        public IList<Agenda> GetByHeadingId(int id)
        {
            return _agendaRepository.GetByHeadingId(id);
        }

        public Agenda GetByTitle(string title)
        {
            return _agendaRepository.GetByTitle(title);
        }

        public void Update(Agenda agenda)
        {
            _agendaRepository.Update(agenda);
        }

        public Agenda GetMaxOrderByMeeting(AgendaQueryOptions queryOption)
        {
            throw new NotImplementedException();
        }

        public Agenda GetMaxOrderForAgenda(AgendaQueryOptions queryOption)
        {
            throw new NotImplementedException();
        }
    }
}
