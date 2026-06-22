namespace MarketPulse.Core.Entities;

public class MarketIndex
{
    public int Id { get; set; }
    public string Symbol { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public decimal CurrentValue { get; set; }
    public decimal ChangePercent { get; set; }

    public ICollection<IndexConstituent> Constituents { get; set; } = [];
    public ICollection<IndexHistory> History { get; set; } = [];
}
