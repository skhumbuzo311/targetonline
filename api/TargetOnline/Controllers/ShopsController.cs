using TargetOnline.Models;
using TargetOnline.Outcomes;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TargetOnline.Outcomes.Results;
using TargetOnline.Services;
using System.Collections.Generic;

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


    [HttpGet]
    public List<Shop> Get()
    {
        return _shopsService.Get();
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




