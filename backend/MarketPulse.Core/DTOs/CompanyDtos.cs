namespace MarketPulse.Core.DTOs;

public record CompanyListItemDto(
    int Id,
    string Symbol,
    string Name,
    string Sector,
    string Country,
    decimal MarketCap,
    string? Rating,
    string? Outlook,
    int? EsgScore
);

public record CompanyDetailDto(
    int Id,
    string Symbol,
    string Name,
    string Sector,
    string Country,
    decimal MarketCap,
    string Description,
    RatingDto? Rating,
    EsgScoreDto? EsgScore
);

public record RatingDto(string Grade, string Outlook, DateTime RatedDate, string Analyst, string Notes);
public record EsgScoreDto(int Environmental, int Social, int Governance, int TotalScore, DateTime AsOfDate);
