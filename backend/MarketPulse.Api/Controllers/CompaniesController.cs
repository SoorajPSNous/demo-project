using MarketPulse.Infrastructure.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MarketPulse.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class CompaniesController(CompanyService companyService) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> Search([FromQuery] string? search, [FromQuery] string? sector)
    {
        var companies = await companyService.SearchAsync(search, sector);
        return Ok(companies);
    }

    [HttpGet("sectors")]
    public async Task<IActionResult> GetSectors()
    {
        var sectors = await companyService.GetSectorsAsync();
        return Ok(sectors);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var company = await companyService.GetByIdAsync(id);
        if (company is null) return NotFound();
        return Ok(company);
    }
}
