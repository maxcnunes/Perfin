
namespace Perfin.Common.Violation
{
    public class RuleViolation
    {
        public string ErrorMessage { get; private set; }
        public string PropertyName { get; private set; }
        public object PropertyValue { get; private set; }

        public RuleViolation(string errorMessage, string propertyName, object propertyValue)
        {
            ErrorMessage = errorMessage;
            PropertyName = propertyName;
            PropertyValue = propertyValue;
        }
    }
}
