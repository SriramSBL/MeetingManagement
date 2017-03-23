using Autofac;
using MM.Core.Services;
using MM.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MM.Service
{
    public class ServiceModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterType(typeof(UserService)).As(typeof(IUserService)).InstancePerLifetimeScope();
            builder.RegisterType(typeof(MeetingService)).As(typeof(IMeetingService)).InstancePerLifetimeScope();
            builder.RegisterType(typeof(MeetingLocationService)).As(typeof(IMeetingLocationService)).InstancePerLifetimeScope();
            builder.RegisterType(typeof(MeetingMemberService)).As(typeof(IMeetingMemberService)).InstancePerLifetimeScope();
            builder.RegisterType(typeof(AgendaService)).As(typeof(IAgendaService)).InstancePerLifetimeScope();
            builder.RegisterType(typeof(MinuteService)).As(typeof(IMinuteService)).InstancePerLifetimeScope();
        }
    }
}
