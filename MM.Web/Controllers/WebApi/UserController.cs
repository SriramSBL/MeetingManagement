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
	public class UserController : ApiController
	{
		private readonly IUserService _userService;
		public UserController(IUserService userService)
		{
			_userService = userService;
		}

		// GET: api/User
		public IEnumerable<User> Get()
		{
			return _userService.GetAllUsers();
		}

		// GET: api/User/5
		public User Get(int id)
		{
			return _userService.GetById(id);
		}

		// GET: api/User/name
		public User Get(string name)
		{
			return _userService.GetByName(name);
		}

        // GET: api/User/email
        //public User Get(string email)
        //{
        //    return _userService.GetByName(email);
        //}

        // POST: api/User
        public void Post(User user)
		{
			_userService.Add(user);
		}

		// PUT: api/User/5
		public void Put(User user)
		{
			_userService.Update(user);
		}

		// DELETE: api/User/5
		public void Delete(int id)
		{
			_userService.Delete(id);
		}
	}
}
