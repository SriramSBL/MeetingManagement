using MM.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MM.Core.Entities;
using MM.Core.Repositories;

namespace MM.Service
{
    public class MinuteService : IMinuteService
    {

        private readonly IMinuteRepository _minuteRepository;

        public MinuteService(IMinuteRepository minuteRepository)
        {
            _minuteRepository = minuteRepository;
        }

        public Minute Add(Minute minute)
        {
            return _minuteRepository.Add(minute);
        }

        public void Delete(int id)
        {
            _minuteRepository.Delete(id);
        }

        public Minute GetByAgendaId(int id)
        {
            return _minuteRepository.GetByAgendaId(id);
        }

        public Minute GetById(int id)
        {
            return _minuteRepository.GetById(id);
        }

        public void Update(Minute minute)
        {
            _minuteRepository.Update(minute);
        }
    }
}
