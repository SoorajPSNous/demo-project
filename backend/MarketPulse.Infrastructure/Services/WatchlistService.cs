using MarketPulse.Core.DTOs;
using MarketPulse.Core.Entities;
using MarketPulse.Infrastructure.Data;

namespace MarketPulse.Infrastructure.Services;

public class WatchlistService(InMemoryDataStore store)
{
    public Task<IReadOnlyList<WatchlistItemDto>> GetForUserAsync(int userId)
    {
        var result = store.WatchlistItems
            .Where(w => w.UserId == userId)
            .OrderByDescending(w => w.AddedAt)
            .Select(w =>
            {
                var company = store.Companies.First(c => c.Id == w.CompanyId);
                return new WatchlistItemDto(
                    w.CompanyId, company.Symbol, company.Name, company.Sector,
                    company.MarketCap, company.Rating?.Grade, company.EsgScore?.TotalScore,
                    w.AddedAt);
            })
            .ToList();

        return Task.FromResult<IReadOnlyList<WatchlistItemDto>>(result);
    }

    public Task<bool> AddAsync(int userId, int companyId)
    {
        if (!store.Companies.Any(c => c.Id == companyId)) return Task.FromResult(false);
        if (store.WatchlistItems.Any(w => w.UserId == userId && w.CompanyId == companyId))
            return Task.FromResult(true);

        var nextId = store.WatchlistItems.Count > 0 ? store.WatchlistItems.Max(w => w.Id) + 1 : 1;
        store.WatchlistItems.Add(new WatchlistItem
        {
            Id = nextId,
            UserId = userId,
            CompanyId = companyId,
            AddedAt = DateTime.UtcNow
        });
        return Task.FromResult(true);
    }

    public Task<bool> RemoveAsync(int userId, int companyId)
    {
        var item = store.WatchlistItems.FirstOrDefault(w => w.UserId == userId && w.CompanyId == companyId);
        if (item is null) return Task.FromResult(false);

        store.WatchlistItems.Remove(item);
        return Task.FromResult(true);
    }
}
