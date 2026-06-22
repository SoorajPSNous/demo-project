namespace MarketPulse.Core.DTOs;

public record WatchlistItemDto(
    int CompanyId,
    string Symbol,
    string Name,
    string Sector,
    decimal MarketCap,
    string? Rating,
    int? EsgScore,
    DateTime AddedAt
);

public record AddWatchlistRequest(int CompanyId);
