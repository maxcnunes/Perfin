using System;
using System.Collections.Generic;

namespace Perfin.Common.Violation
{
    public class RuleViolationException : Exception
    {
        public List<RuleViolation> Issues { get; private set; }

        public RuleViolationException() : base() { }
        public RuleViolationException(string message) : base(message) { }
        public RuleViolationException(string message, Exception innerException) : base(message, innerException) { }
        public RuleViolationException(string message, List<RuleViolation> issues)
            : base(message)
        {
            Issues = issues;
        }
    }
}
