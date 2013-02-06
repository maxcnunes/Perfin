using System.Collections.Generic;

namespace Perfin.Common.Violation
{
    public interface IRuleEntity
    {
        void EnsureValid();
        List<RuleViolation> GetRuleViolations();
    }
}
