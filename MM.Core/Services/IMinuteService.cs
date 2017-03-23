using MM.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MM.Core.Services
{
    public interface IMinuteService
    {
        Minute Add(Minute minute);

        void Update(Minute minute);

        void Delete(int id);

        Minute GetById(int id);

        Minute GetByAgendaId(int id);
    }
}
