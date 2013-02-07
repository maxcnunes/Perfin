using Perfin.Common.Violation;
using System;
using System.Collections.Generic;

namespace Perfin.Common.Exceptions
{
    public class BusinessRuleViolationException : Exception
    {
        private const string ErrorMessageNotification = "";
        IEnumerable<RuleViolation> RuleViolations { get; set; }

        public BusinessRuleViolationException() { }

        public BusinessRuleViolationException(string message) : base(message) { }

        public BusinessRuleViolationException(string message, Exception inner) : base(message) { }

        public BusinessRuleViolationException(RuleViolation ruleViolation)
            : base(ErrorMessageNotification)
        {
            RuleViolations = new List<RuleViolation> { ruleViolation };
        }

        public BusinessRuleViolationException(IEnumerable<RuleViolation> ruleViolations)
            : base(ErrorMessageNotification)
        {
            RuleViolations = ruleViolations;
        }
    }
}
