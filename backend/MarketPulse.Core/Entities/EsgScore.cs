namespace MarketPulse.Core.Entities;

public class EsgScore
{
    public int Id { get; set; }
    public int CompanyId { get; set; }
    public int Environmental { get; set; }
    public int Social { get; set; }
    public int Governance { get; set; }
    public int TotalScore { get; set; }
    public DateTime AsOfDate { get; set; }

    public Company Company { get; set; } = null!;
}
