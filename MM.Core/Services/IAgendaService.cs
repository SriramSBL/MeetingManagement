using MM.Core.Entities;
using MM.Core.QueryOptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MM.Core.Services
{
    public interface IAgendaService
    {
        Agenda Add(Agenda agenda);

        void Update(Agenda agenda);

        void Delete(int id);

        Agenda GetById(int id);

        IList<Agenda> GetByHeadingId(int id);

        Agenda GetMaxOrderByMeeting(AgendaQueryOptions queryOption);

        Agenda GetMaxOrderForAgenda(AgendaQueryOptions queryOption);
        Agenda GetByTitle(string title);

        IList<Agenda> GetAllAgendas();

    }
}
