using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MM.Core.Exceptions
{
    
    public class AddFailedException<T> :
        Exception where T : class
    {
        public AddFailedException() :
            base($"Adding failed for {typeof(T)}.")
        { }
    }
}
