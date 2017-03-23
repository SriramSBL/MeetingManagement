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
using System.Data.Entity.Validation;

namespace MM.Repository
{
    public class MinuteRepository : IMinuteRepository
    {

        private readonly entitymmEntities _meetingDbContext = new entitymmEntities();

        public Minute Add(Minute minute)
        {
            MM_Minute minuteDbModel = new MM_Minute()
            {
                Title = minute.Title,
                AgendaId = minute.Agenda.Id,
                CreatedBy = minute.UserCreated.Id,
                CreatedDate = DateTime.UtcNow,
                ModifiedBy = null,
            };

            _meetingDbContext.MM_Minutes.Add(minuteDbModel);

            try
            {
                _meetingDbContext.SaveChanges();
            }
            catch (DbEntityValidationException e)
            {
                foreach(var eve in e.EntityValidationErrors)
                {
                    Console.WriteLine("Entity of type \"{0}\" in state \"{1}\" has the following validation errors:",
                        eve.Entry.Entity.GetType().Name, eve.Entry.State);
                    foreach (var ve in eve.ValidationErrors)
                    {
                        Console.WriteLine("- Property: \"{0}\", Error: \"{1}\"",
                            ve.PropertyName, ve.ErrorMessage);
                    }
                }
                //throw new AddFailedException<Minute>();
            }

            return null;
        }

        public void Delete(int id)
        {
            MM_Minute minuteDbModel = _meetingDbContext.MM_Minutes.FirstOrDefault(x => x.Id == id);

            if (minuteDbModel == null)
                throw new EntityNotFoundException<MeetingLocation>(id);

            _meetingDbContext.MM_Minutes.Remove(minuteDbModel);

            try
            {
                _meetingDbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new DeleteFailedException<Minute>(id);
            }
        }

        public Minute GetByAgendaId(int id)
        {
            MM_Minute minuteDbModel = _meetingDbContext.MM_Minutes.FirstOrDefault(m => m.AgendaId == id);

            //if (minuteDbModel == null)
            //    throw new EntityNotFoundException<Minute>(id);

            if (minuteDbModel == null)
                return null;
            return minuteDbModel.ConvertToMinutes();
        }

        public Minute GetById(int id)
        {
            MM_Minute minuteDbModel = _meetingDbContext.MM_Minutes.FirstOrDefault(r => r.Id == id);

            if (minuteDbModel == null)
                throw new EntityNotFoundException<Minute>(id);

            return minuteDbModel.ConvertToMinutes();
        }


        public void Update(Minute minute)
        {
            MM_Minute minuteDbModel = _meetingDbContext.MM_Minutes.Find(minute.Id);

            if (minuteDbModel == null)
                throw new EntityNotFoundException<Minute>((int)minute.Id);

            minuteDbModel.Title = minute.Title;
            minuteDbModel.ModifiedBy = minute.UserCreated.Id;
            minuteDbModel.ModifiedDate = DateTime.UtcNow;

            try
            {
                _meetingDbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new UpdateFailedException<Minute>();
            }
        }

    }
}
