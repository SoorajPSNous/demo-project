using System.Security.Claims;
using MarketPulse.Core.DTOs;
using MarketPulse.Infrastructure.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MarketPulse.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class WatchlistController(WatchlistService watchlistService) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var userId = GetUserId();
        var items = await watchlistService.GetForUserAsync(userId);
        return Ok(items);
    }

    [HttpPost]
    public async Task<IActionResult> Add([FromBody] AddWatchlistRequest request)
    {
        var userId = GetUserId();
        var added = await watchlistService.AddAsync(userId, request.CompanyId);
        if (!added) return NotFound(new { message = "Company not found." });
        return Ok(new { message = "Added to watchlist." });
    }

    [HttpDelete("{companyId:int}")]
    public async Task<IActionResult> Remove(int companyId)
    {
        var userId = GetUserId();
        var removed = await watchlistService.RemoveAsync(userId, companyId);
        if (!removed) return NotFound();
        return NoContent();
    }

    private int GetUserId() =>
        int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
}
