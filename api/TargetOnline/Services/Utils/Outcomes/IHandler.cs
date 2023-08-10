using TargetOnline.Outcomes.Results;
using Microsoft.AspNetCore.Mvc;

namespace TargetOnline.Outcomes
{
    public interface IHandler
    {
        ActionResult<IOutcome> HandleOutcome(IOutcome outcome);
        ActionResult<IOutcome<T>> HandleOutcome<T>(IOutcome<T> outcome);
    }
}
