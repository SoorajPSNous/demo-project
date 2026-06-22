namespace MarketPulse.Core.DTOs;

public record DashboardSummaryDto(
    int TotalCompanies,
    int RatedCompanies,
    decimal AvgEsgScore,
    decimal Sp500Value,
    decimal Sp500Change,
    IReadOnlyList<SectorBreakdownDto> SectorBreakdown,
    IReadOnlyList<TopMoverDto> TopMovers,
    IReadOnlyList<IndexHistoryPointDto> IndexTrend
);

public record SectorBreakdownDto(string Sector, int Count, decimal AvgEsg);
public record TopMoverDto(string Symbol, string Name, string Sector, decimal MarketCap, string Rating, int EsgScore);
public record IndexHistoryPointDto(string Date, decimal Value);
