using MarketPulse.Infrastructure.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MarketPulse.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class EsgController(EsgService esgService) : ControllerBase
{
    [HttpGet("leaderboard")]
    public async Task<IActionResult> GetLeaderboard([FromQuery] string? sector)
    {
        var items = await esgService.GetLeaderboardAsync(sector);
        return Ok(items);
    }
}
