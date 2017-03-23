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
using MM.Core.QueryOptions;

namespace MM.Repository
{
    public class AgendaRepository : IAgendaRepository
    {

        private readonly entitymmEntities _meetingDbContext = new entitymmEntities();

        public Agenda Add(Agenda agenda)
        {
            MM_Agenda agendaDbModel = new MM_Agenda()
            {
                MeetingId = agenda.Meeting.Id,
                HeadingId = agenda.Heading==null? (int?)null : agenda.Heading.Id,
                Title = agenda.Title,
                SerialId=agenda.SerialId,
                OrderId=agenda.OrderId,
                IsCompleted = false
            };
            

            _meetingDbContext.MM_Agendas.Add(agendaDbModel);

            try
            {
                _meetingDbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new AddFailedException<MeetingLocation>();
            }
            
            return agendaDbModel.ConvertToAgendas();

        }

        public void Delete(int id)
        {
            MM_Agenda agendaDbModel = _meetingDbContext.MM_Agendas.FirstOrDefault(x=> x.Id==id);

            if (agendaDbModel == null)
                throw new EntityNotFoundException<MeetingLocation>(id);

            _meetingDbContext.MM_Agendas.Remove(agendaDbModel);
            try
            {
                _meetingDbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new DeleteFailedException<MeetingLocation>(id);
            }
            
        }

        public IList<Agenda> GetAllAgendas()
        {
           return _meetingDbContext.MM_Agendas.ToList().Where(y=>y.HeadingId==null).OrderBy(y=>y.HeadingId).Select(x=>x.ConvertToAgendas()).ToList();
        }

        public Agenda GetById(int id)
        {
            MM_Agenda agendaDbModel = _meetingDbContext.MM_Agendas.FirstOrDefault(r => r.Id == id);

            if (agendaDbModel == null)
                throw new EntityNotFoundException<MeetingLocation>(id);

            return agendaDbModel.ConvertToAgendas();
        }
        

        public IList<Agenda> GetByHeadingId(int id)
        {
            IList<Agenda> agendaDbModel = _meetingDbContext.MM_Agendas.ToList().Where(x => x.MeetingId == id).Select(y=>y.ConvertToAgendas()).ToList();
            

            if (agendaDbModel == null)
                return null;

            return agendaDbModel;
        }

        public Agenda GetByTitle(string title)
        {
            MM_Agenda agendaDbModel = _meetingDbContext.MM_Agendas.FirstOrDefault(r=> r.Title==title);

            if (agendaDbModel == null)
                throw new EntityNotFoundException<MeetingLocation>(title);

            return agendaDbModel.ConvertToAgendas();
        }

        public void Update(Agenda agenda)
        {

            MM_Agenda agendaDbModel = _meetingDbContext.MM_Agendas.Find(agenda.Id);

            if (agendaDbModel == null)
                throw new EntityNotFoundException<MeetingLocation>((int)agendaDbModel.Id);



            if (agenda.IsCompleted == true)
            {
                agendaDbModel.IsCompleted = agenda.IsCompleted;
            }
            else
            {
                agendaDbModel.Title = agenda.Title;
                agendaDbModel.SerialId = agenda.SerialId;
            }

            //agendaDbModel.OrderId = agenda.OrderId;
            //agendaDbModel.MeetingId = agenda.MeetingId;
            //agendaDbModel.HeadingId = agenda.Heading.Id;


            try
            {
                _meetingDbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new UpdateFailedException<MeetingLocation>();
            }
            
        }

        public Agenda GetMaxOrderByMeeting(AgendaQueryOptions queryOption)
        {
           
            return _meetingDbContext.MM_Agendas.ToList().Where(
                x=>x.MeetingId==queryOption.MeetingId && x.HeadingId == null && x.OrderId== _meetingDbContext.MM_Agendas.ToList().Where(y => y.MeetingId == queryOption.MeetingId && y.HeadingId == null).Max(y => y.OrderId).GetValueOrDefault()).FirstOrDefault().ConvertToAgendas();
        }

        public Agenda GetMaxOrderForAgenda(AgendaQueryOptions queryOption)
        {
            return _meetingDbContext.MM_Agendas.ToList().Where(
                x => x.MeetingId == queryOption.MeetingId && x.HeadingId == queryOption.AgendaId && x.OrderId == _meetingDbContext.MM_Agendas.ToList().Where(y => y.MeetingId == queryOption.MeetingId && y.HeadingId == queryOption.AgendaId).Max(y => y.OrderId).GetValueOrDefault()).FirstOrDefault().ConvertToAgendas();
        }
    }
}
