namespace MarketPulse.Core.Entities;

public class IndexHistory
{
    public int Id { get; set; }
    public int IndexId { get; set; }
    public DateTime Date { get; set; }
    public decimal Value { get; set; }

    public MarketIndex Index { get; set; } = null!;
}
