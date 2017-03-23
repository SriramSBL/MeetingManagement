using MM.Core.Entities;
using System.Collections.Generic;

namespace MM.Core.Repositories
{
    public interface IUserRepository
	{
        void Add(User user);

        void Update(User user);

        void Delete(int id);

        User GetById(int id);

        User GetByName(string name);

		User GetByEmail(string email);

		IList<User> GetAllUsers();
    }
}
