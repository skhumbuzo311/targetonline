using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;
using TargetOnline.Models;
using TargetOnline.Outcomes.Results;

namespace TargetOnline.Services
{
    public interface IShopsService
    {
        Shop Get(int shopId);
        Task<IOutcome<Shop>> Create(HttpRequest httpRequest);
    }
}
