using MarketPulse.Infrastructure.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MarketPulse.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class IndicesController(IndexService indexService) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var indices = await indexService.GetAllAsync();
        return Ok(indices);
    }

    [HttpGet("{id:int}/constituents")]
    public async Task<IActionResult> GetConstituents(int id)
    {
        var constituents = await indexService.GetConstituentsAsync(id);
        if (constituents is null) return NotFound();
        return Ok(constituents);
    }

    [HttpGet("{id:int}/history")]
    public async Task<IActionResult> GetHistory(int id)
    {
        var history = await indexService.GetHistoryAsync(id);
        if (history is null) return NotFound();
        return Ok(history);
    }
}
