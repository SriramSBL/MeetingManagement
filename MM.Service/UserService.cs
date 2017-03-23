using MM.Core.Services;
using System.Collections.Generic;
using MM.Core.Entities;
using MM.Core.Repositories;

namespace MM.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _riskUserRepository;

        public UserService(IUserRepository riskUserRepository)
        {
            _riskUserRepository = riskUserRepository;
        }

        public void Add(User user)
        {
            _riskUserRepository.Add(user);
        }

        public void Delete(int id)
        {
            _riskUserRepository.Delete(id);
        }

	    public User GetByEmail(string email)
	    {
            return _riskUserRepository.GetByEmail(email);
        }

	    public IList<User> GetAllUsers()
        {
            return _riskUserRepository.GetAllUsers();
        }

        public User GetById(int id)
        {
            return _riskUserRepository.GetById(id);
        }

        public User GetByName(string name)
        {
            return _riskUserRepository.GetByName(name);
        }

        public void Update(User user)
        {
            _riskUserRepository.Update(user);
        }
    }
}
