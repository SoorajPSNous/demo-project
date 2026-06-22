using MarketPulse.Core.DTOs;
using MarketPulse.Infrastructure.Data;

namespace MarketPulse.Infrastructure.Services;

public class IndexService(InMemoryDataStore store)
{
    public Task<IReadOnlyList<IndexListItemDto>> GetAllAsync()
    {
        var result = store.Indices
            .OrderBy(i => i.Symbol)
            .Select(i => new IndexListItemDto(i.Id, i.Symbol, i.Name, i.CurrentValue, i.ChangePercent))
            .ToList();
        return Task.FromResult<IReadOnlyList<IndexListItemDto>>(result);
    }

    public Task<IReadOnlyList<IndexConstituentDto>?> GetConstituentsAsync(int id)
    {
        if (!store.Indices.Any(i => i.Id == id)) return Task.FromResult<IReadOnlyList<IndexConstituentDto>?>(null);

        var result = store.IndexConstituents
            .Where(c => c.IndexId == id)
            .OrderByDescending(c => c.Weight)
            .Select(c =>
            {
                var company = store.Companies.First(co => co.Id == c.CompanyId);
                return new IndexConstituentDto(
                    c.CompanyId, company.Symbol, company.Name, company.Sector,
                    c.Weight, company.Rating?.Grade, company.EsgScore?.TotalScore);
            })
            .ToList();

        return Task.FromResult<IReadOnlyList<IndexConstituentDto>?>(result);
    }

    public Task<IReadOnlyList<IndexHistoryPointDto>?> GetHistoryAsync(int id)
    {
        if (!store.Indices.Any(i => i.Id == id)) return Task.FromResult<IReadOnlyList<IndexHistoryPointDto>?>(null);

        var result = store.IndexHistory
            .Where(h => h.IndexId == id)
            .OrderBy(h => h.Date)
            .Select(h => new IndexHistoryPointDto(h.Date.ToString("yyyy-MM-dd"), h.Value))
            .ToList();

        return Task.FromResult<IReadOnlyList<IndexHistoryPointDto>?>(result);
    }
}
