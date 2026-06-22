namespace MarketPulse.Core.DTOs;

public record EsgLeaderboardItemDto(
    int CompanyId,
    string Symbol,
    string Name,
    string Sector,
    int Environmental,
    int Social,
    int Governance,
    int TotalScore
);
