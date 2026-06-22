using MarketPulse.Core.DTOs;
using MarketPulse.Infrastructure.Data;

namespace MarketPulse.Infrastructure.Services;

public class CompanyService(InMemoryDataStore store)
{
    public Task<IReadOnlyList<CompanyListItemDto>> SearchAsync(string? search, string? sector)
    {
        var query = store.Companies.AsEnumerable();

        if (!string.IsNullOrWhiteSpace(search))
        {
            var term = search.Trim().ToLower();
            query = query.Where(c =>
                c.Symbol.ToLower().Contains(term) ||
                c.Name.ToLower().Contains(term));
        }

        if (!string.IsNullOrWhiteSpace(sector))
            query = query.Where(c => c.Sector == sector);

        var result = query
            .OrderBy(c => c.Symbol)
            .Select(c => new CompanyListItemDto(
                c.Id, c.Symbol, c.Name, c.Sector, c.Country, c.MarketCap,
                c.Rating?.Grade, c.Rating?.Outlook, c.EsgScore?.TotalScore))
            .ToList();

        return Task.FromResult<IReadOnlyList<CompanyListItemDto>>(result);
    }

    public Task<CompanyDetailDto?> GetByIdAsync(int id)
    {
        var company = store.Companies.FirstOrDefault(c => c.Id == id);
        if (company is null) return Task.FromResult<CompanyDetailDto?>(null);

        return Task.FromResult<CompanyDetailDto?>(new CompanyDetailDto(
            company.Id, company.Symbol, company.Name, company.Sector,
            company.Country, company.MarketCap, company.Description,
            company.Rating != null
                ? new RatingDto(company.Rating.Grade, company.Rating.Outlook,
                    company.Rating.RatedDate, company.Rating.Analyst, company.Rating.Notes)
                : null,
            company.EsgScore != null
                ? new EsgScoreDto(company.EsgScore.Environmental, company.EsgScore.Social,
                    company.EsgScore.Governance, company.EsgScore.TotalScore, company.EsgScore.AsOfDate)
                : null
        ));
    }

    public Task<IReadOnlyList<string>> GetSectorsAsync()
    {
        var sectors = store.Companies.Select(c => c.Sector).Distinct().OrderBy(s => s).ToList();
        return Task.FromResult<IReadOnlyList<string>>(sectors);
    }
}
