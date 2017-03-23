using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MM.Web.Controllers
{  // GET: UserSession
    public class UserSessionController : Controller
    {
        [HttpGet]
        public JObject GetSession()
        {
            var jsonObject = new JObject();
            jsonObject = JObject.FromObject(new { UserID = 1 });
            return jsonObject;
        }

        [HttpGet]
        public JObject DisconnectSession()
        {
            Session.RemoveAll();
            return JObject.FromObject(new { UserDisconnected = 0 });
        }
    }
}