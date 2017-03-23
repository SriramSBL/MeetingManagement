using MM.Core.Repositories;
using MM.Repository.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MM.Core.Entities;
using MM.Core.Exceptions;
using MM.Repository.Helpers;

namespace MM.Repository
{
    public class MeetingLocationRepository : IMeetingLocationRepository
    {
        private readonly entitymmEntities _meetingDbContext = new entitymmEntities();

        public int Add(MeetingLocation meetingLocation)
        {
            MM_MeetingLocation meetingLocationDbModel = new MM_MeetingLocation()
            {
                LocationName = meetingLocation.Name   
            };

            _meetingDbContext.MM_MeetingLocations.Add(meetingLocationDbModel);
            try
            {
                _meetingDbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new AddFailedException<MeetingLocation>();
            }


            Console.WriteLine("Log Item is Added.");

            return meetingLocationDbModel.Id;
        }

        public void Delete(int id)
        {
            MM_MeetingLocation meetingLocationDbModel = _meetingDbContext.MM_MeetingLocations.FirstOrDefault(x => x.Id == id);

            if (meetingLocationDbModel == null)
                throw new EntityNotFoundException<MeetingLocation>(id);

            _meetingDbContext.MM_MeetingLocations.Remove(meetingLocationDbModel);
            try
            {
                _meetingDbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new DeleteFailedException<MeetingLocation>(id);
            }


            Console.WriteLine("Log Event  is Deleted.");
        }

        public IList<MeetingLocation> GetAllMeetingLocations()
        {
            Console.WriteLine("Got All Log Events.");

            return _meetingDbContext.MM_MeetingLocations.ToList().Select(e => e.ConvertToMeetingLocation()).ToList();
        }

        public MeetingLocation GetById(int id)
        {
            MM_MeetingLocation meetingLocationDbModel = _meetingDbContext.MM_MeetingLocations.FirstOrDefault(r => r.Id == id);

            if (meetingLocationDbModel == null)
                throw new EntityNotFoundException<MeetingLocation>(id);
            Console.WriteLine("Log Event got by id.");

            return meetingLocationDbModel.ConvertToMeetingLocation();
        }

        public MeetingLocation GetByName(string name)
        {
            MM_MeetingLocation meetingLocationDbModel = _meetingDbContext.MM_MeetingLocations.FirstOrDefault(r => r.LocationName == name);

            if (meetingLocationDbModel == null)
                throw new EntityNotFoundException<MeetingLocation>(name);

            Console.WriteLine("Log Event got by id.");

            return meetingLocationDbModel.ConvertToMeetingLocation();
        }

        public void Update(MeetingLocation meetingLocation)
        {
            MM_MeetingLocation meetingLocationDbModel = _meetingDbContext.MM_MeetingLocations.Find(meetingLocation.Id);
            if (meetingLocationDbModel == null)
                throw new EntityNotFoundException<MeetingLocation>((int)meetingLocation.Id);

            meetingLocationDbModel.LocationName = meetingLocation.Name;

            try
            {
                _meetingDbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new UpdateFailedException<MeetingLocation>((int)meetingLocation.Id);
            }
            Console.WriteLine("Log Event is Updated.");
        }
    }
}
