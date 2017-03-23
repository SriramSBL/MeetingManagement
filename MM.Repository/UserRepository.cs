using System;
using System.Collections.Generic;
using System.Linq;
using MM.Core.Entities;
using MM.Core.Exceptions;
using MM.Core.Repositories;
using MM.Repository.EntityFramework;
using MM.Repository.Helpers;

namespace MM.Repository
{
	public class UserRepository : IUserRepository
    {
		private readonly entitymmEntities _meetingDbContext = new entitymmEntities();

		public void Add(User user)
		{
			MM_User MMUserDbModel = new MM_User()
			{
				Id = user.Id,
				Name = user.Name,
				Email = user.Email
			};

			_meetingDbContext.MM_Users.Add(MMUserDbModel);
            try
            {
                _meetingDbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new AddFailedException<User>();
            }


            Console.WriteLine("MM User is Added.");
		}

		public void Delete(int id)
		{
			MM_User MMUserDbModel = _meetingDbContext.MM_Users.FirstOrDefault(u => u.Id == id);

			if (MMUserDbModel == null)
                throw new EntityNotFoundException<User>(id);

            _meetingDbContext.MM_Users.Remove(MMUserDbModel);
            try
            {
                _meetingDbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new DeleteFailedException<User>(id);
            }

            Console.WriteLine("MM User is Deleted.");
		}

		public User GetByEmail(string email)
        {
            MM_User MMUserDbModel = _meetingDbContext.MM_Users.FirstOrDefault(r => r.Email == email);

            if (MMUserDbModel == null)
                throw new EntityNotFoundException<User>(email);

            Console.WriteLine("User details got by email.");

            return MMUserDbModel.ConvertToUser();
        }

		public IList<User> GetAllUsers()
		{
			Console.WriteLine("Got All users.");

			return _meetingDbContext.MM_Users.ToList().Select(e => e.ConvertToUser()).ToList();
		}

		public User GetById(int id)
		{
			MM_User MMUserDbModel = _meetingDbContext.MM_Users.FirstOrDefault(r => r.Id == id);

			if (MMUserDbModel == null)
                throw new EntityNotFoundException<User>(id);

            Console.WriteLine("User details got by id.");

			return MMUserDbModel.ConvertToUser();
		}

		public User GetByName(string name)
		{
			MM_User MMUserDbModel = _meetingDbContext.MM_Users.FirstOrDefault(r => r.Name == name);

			if (MMUserDbModel == null)
                throw new EntityNotFoundException<User>(name);

            Console.WriteLine("User details got by name.");

			return MMUserDbModel.ConvertToUser();
		}

		public void Update(User user)
		{
			MM_User MMUserDbModel = _meetingDbContext.MM_Users.Find(user.Id);

			if (MMUserDbModel == null)
                throw new EntityNotFoundException<User>(user.Id);

            MMUserDbModel.Name = user.Name;
			MMUserDbModel.Email = user.Email;

            try
            {
                _meetingDbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new UpdateFailedException<User>(user.Id);
            }
            Console.WriteLine("MM User is Updated.");
		}
	}
}
