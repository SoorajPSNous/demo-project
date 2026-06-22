using MarketPulse.Core.DTOs;
using MarketPulse.Infrastructure.Data;

namespace MarketPulse.Infrastructure.Services;

public class EsgService(InMemoryDataStore store)
{
    public Task<IReadOnlyList<EsgLeaderboardItemDto>> GetLeaderboardAsync(string? sector)
    {
        var query = store.EsgScores.AsEnumerable();

        if (!string.IsNullOrWhiteSpace(sector))
            query = query.Where(e => store.Companies.First(c => c.Id == e.CompanyId).Sector == sector);

        var result = query
            .OrderByDescending(e => e.TotalScore)
            .Select(e =>
            {
                var company = store.Companies.First(c => c.Id == e.CompanyId);
                return new EsgLeaderboardItemDto(
                    e.CompanyId, company.Symbol, company.Name, company.Sector,
                    e.Environmental, e.Social, e.Governance, e.TotalScore);
            })
            .ToList();

        return Task.FromResult<IReadOnlyList<EsgLeaderboardItemDto>>(result);
    }
}
