namespace MarketPulse.Core.DTOs;

public record IndexListItemDto(
    int Id,
    string Symbol,
    string Name,
    decimal CurrentValue,
    decimal ChangePercent
);

public record IndexConstituentDto(
    int CompanyId,
    string Symbol,
    string Name,
    string Sector,
    decimal Weight,
    string? Rating,
    int? EsgScore
);
