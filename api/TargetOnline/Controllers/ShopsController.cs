using TargetOnline.Models;
using TargetOnline.Outcomes;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TargetOnline.Outcomes.Results;
using TargetOnline.Services;

namespace api.Controllers;

[ApiController]
[Route("[controller]")]
public class ShopsController : ControllerBase
{
    private readonly IShopsService _shopsService;
    private readonly IHandler _handler;

    public ShopsController(IShopsService shopsService, IHandler handler)
    {
        _shopsService = shopsService;
        _handler = handler;
    }

    [HttpGet("shopId")]
    public Shop Get(int shopId)
    {
        return _shopsService.Get(shopId);
    }

    [HttpPost]
    public async Task<ActionResult<IOutcome<Shop>>> Create()
    {
        return _handler.HandleOutcome(await _shopsService.Create(Request));
    }
}




