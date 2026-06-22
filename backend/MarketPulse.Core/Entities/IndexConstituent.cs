namespace MarketPulse.Core.Entities;

public class IndexConstituent
{
    public int Id { get; set; }
    public int IndexId { get; set; }
    public int CompanyId { get; set; }
    public decimal Weight { get; set; }
    public DateTime AsOfDate { get; set; }

    public MarketIndex Index { get; set; } = null!;
    public Company Company { get; set; } = null!;
}
