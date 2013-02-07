using System;

namespace Perfin.Common.Exceptions
{
    public class DataOperationException : Exception
    {
        public DataOperationException() { }

        public DataOperationException(string message) : base(message) { }

        public DataOperationException(string message, Exception inner) : base(message) { }
    }
}
