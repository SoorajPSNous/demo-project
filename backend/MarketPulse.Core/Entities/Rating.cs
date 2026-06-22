namespace MarketPulse.Core.Entities;

public class Rating
{
    public int Id { get; set; }
    public int CompanyId { get; set; }
    public string Grade { get; set; } = string.Empty;
    public string Outlook { get; set; } = string.Empty;
    public DateTime RatedDate { get; set; }
    public string Analyst { get; set; } = string.Empty;
    public string Notes { get; set; } = string.Empty;

    public Company Company { get; set; } = null!;
}
