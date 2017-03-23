using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MM.Core.Exceptions
{
    public class DeleteFailedException<T> :
        Exception where T : class
    {
        public DeleteFailedException(int id) :
            base($"Delete failed for {typeof(T)} with {id}.")
        { }
    }
}
