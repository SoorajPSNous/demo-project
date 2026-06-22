using MarketPulse.Core.DTOs;
using MarketPulse.Infrastructure.Data;

namespace MarketPulse.Infrastructure.Services;

public class DashboardService(InMemoryDataStore store)
{
    public Task<DashboardSummaryDto> GetSummaryAsync()
    {
        var companies = store.Companies;
        var sp500 = store.Indices.First(i => i.Symbol == "SPX");
        var history = store.IndexHistory
            .Where(h => h.IndexId == sp500.Id)
            .OrderBy(h => h.Date)
            .Take(90)
            .Select(h => new IndexHistoryPointDto(h.Date.ToString("yyyy-MM-dd"), h.Value))
            .ToList();

        var sectorBreakdown = companies
            .GroupBy(c => c.Sector)
            .Select(g => new SectorBreakdownDto(
                g.Key,
                g.Count(),
                Math.Round(g.Where(c => c.EsgScore != null).Average(c => (decimal)c.EsgScore!.TotalScore), 1)))
            .OrderByDescending(s => s.Count)
            .ToList();

        var topMovers = companies
            .OrderByDescending(c => c.MarketCap)
            .Take(5)
            .Select(c => new TopMoverDto(
                c.Symbol, c.Name, c.Sector, c.MarketCap,
                c.Rating?.Grade ?? "NR", c.EsgScore?.TotalScore ?? 0))
            .ToList();

        var avgEsg = companies.Where(c => c.EsgScore != null).Average(c => (decimal)c.EsgScore!.TotalScore);

        return Task.FromResult(new DashboardSummaryDto(
            companies.Count,
            companies.Count(c => c.Rating != null),
            Math.Round(avgEsg, 1),
            sp500.CurrentValue,
            sp500.ChangePercent,
            sectorBreakdown,
            topMovers,
            history
        ));
    }
}
