using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading.Tasks;
using TargetOnline.Models;
using TargetOnline.Outcomes.Results;

namespace TargetOnline.Services
{
    public interface IShopsService
    {
        List<Shop> Get();
        Shop Get(int shopId);
        Task<IOutcome<Shop>> Create(HttpRequest httpRequest);
    }
}
