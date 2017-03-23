using Autofac;
using MM.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MM.Repository
{
    public class RepositoryModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterType(typeof(UserRepository)).As(typeof(IUserRepository)).InstancePerLifetimeScope();
            builder.RegisterType(typeof(MeetingRepository)).As(typeof(IMeetingRepository)).InstancePerLifetimeScope();
            builder.RegisterType(typeof(MeetingLocationRepository)).As(typeof(IMeetingLocationRepository)).InstancePerLifetimeScope();
            builder.RegisterType(typeof(MeetingMemberRepository)).As(typeof(IMeetingMemberRepository)).InstancePerLifetimeScope();
            builder.RegisterType(typeof(AgendaRepository)).As(typeof(IAgendaRepository)).InstancePerLifetimeScope();
            builder.RegisterType(typeof(MinuteRepository)).As(typeof(IMinuteRepository)).InstancePerLifetimeScope();

        }
    }
}
