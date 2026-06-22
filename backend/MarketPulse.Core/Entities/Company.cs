namespace MarketPulse.Core.Entities;

public class Company
{
    public int Id { get; set; }
    public string Symbol { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Sector { get; set; } = string.Empty;
    public string Country { get; set; } = string.Empty;
    public decimal MarketCap { get; set; }
    public string Description { get; set; } = string.Empty;

    public Rating? Rating { get; set; }
    public EsgScore? EsgScore { get; set; }
    public ICollection<IndexConstituent> IndexConstituents { get; set; } = [];
    public ICollection<WatchlistItem> WatchlistItems { get; set; } = [];
}
