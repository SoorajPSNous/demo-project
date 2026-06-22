namespace MarketPulse.Core.Entities;

public class WatchlistItem
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int CompanyId { get; set; }
    public DateTime AddedAt { get; set; }

    public User User { get; set; } = null!;
    public Company Company { get; set; } = null!;
}
