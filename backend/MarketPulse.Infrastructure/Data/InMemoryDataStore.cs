using MarketPulse.Core.Entities;

namespace MarketPulse.Infrastructure.Data;

public class InMemoryDataStore
{
    public List<User> Users { get; } = [];
    public List<Company> Companies { get; } = [];
    public List<Rating> Ratings { get; } = [];
    public List<EsgScore> EsgScores { get; } = [];
    public List<MarketIndex> Indices { get; } = [];
    public List<IndexConstituent> IndexConstituents { get; } = [];
    public List<IndexHistory> IndexHistory { get; } = [];
    public List<WatchlistItem> WatchlistItems { get; } = [];

    public InMemoryDataStore()
    {
        Seed();
    }

    private void Seed()
    {
        var demoUser = new User
        {
            Id = 1,
            Email = "demo@spglobal.com",
            Name = "Demo Analyst",
            PasswordHash = BCrypt.Net.BCrypt.HashPassword("Demo@123")
        };
        Users.Add(demoUser);

        var companyData = new (string Symbol, string Name, string Sector, string Country, decimal MarketCap, string Description)[]
        {
            ("AAPL", "Apple Inc.", "Technology", "USA", 2850000, "Designs and manufactures consumer electronics, software, and online services."),
            ("MSFT", "Microsoft Corporation", "Technology", "USA", 3100000, "Develops and licenses software, cloud services, and enterprise solutions."),
            ("JPM", "JPMorgan Chase & Co.", "Financials", "USA", 580000, "Global financial services firm offering investment banking and asset management."),
            ("XOM", "Exxon Mobil Corporation", "Energy", "USA", 450000, "Explores, produces, and markets oil and natural gas globally."),
            ("JNJ", "Johnson & Johnson", "Healthcare", "USA", 380000, "Pharmaceuticals, medical devices, and consumer health products."),
            ("UNH", "UnitedHealth Group", "Healthcare", "USA", 520000, "Health insurance and healthcare services provider."),
            ("PG", "Procter & Gamble", "Consumer", "USA", 390000, "Consumer goods including personal care and household products."),
            ("HD", "Home Depot", "Consumer", "USA", 360000, "Home improvement retail chain."),
            ("V", "Visa Inc.", "Financials", "USA", 540000, "Global payments technology company."),
            ("MA", "Mastercard Inc.", "Financials", "USA", 430000, "Payment processing and financial technology services."),
            ("NVDA", "NVIDIA Corporation", "Technology", "USA", 2200000, "Designs GPUs and AI computing platforms."),
            ("GOOGL", "Alphabet Inc.", "Technology", "USA", 1950000, "Search, advertising, cloud, and AI technology conglomerate."),
            ("AMZN", "Amazon.com Inc.", "Consumer", "USA", 1900000, "E-commerce, cloud computing, and digital streaming."),
            ("TSLA", "Tesla Inc.", "Consumer", "USA", 780000, "Electric vehicles, energy storage, and solar products."),
            ("BRK.B", "Berkshire Hathaway", "Financials", "USA", 890000, "Conglomerate with insurance, railroads, and investments."),
            ("LLY", "Eli Lilly", "Healthcare", "USA", 720000, "Pharmaceutical company focused on diabetes and oncology."),
            ("CVX", "Chevron Corporation", "Energy", "USA", 290000, "Integrated energy company in oil and gas."),
            ("KO", "Coca-Cola Company", "Consumer", "USA", 270000, "Beverage manufacturer and marketer."),
            ("PEP", "PepsiCo Inc.", "Consumer", "USA", 240000, "Food and beverage company with global brands."),
            ("ABBV", "AbbVie Inc.", "Healthcare", "USA", 310000, "Biopharmaceutical research and development."),
            ("COST", "Costco Wholesale", "Consumer", "USA", 340000, "Membership warehouse club retailer."),
            ("WMT", "Walmart Inc.", "Consumer", "USA", 520000, "Multinational retail corporation."),
            ("BAC", "Bank of America", "Financials", "USA", 310000, "Banking and financial services."),
            ("GS", "Goldman Sachs", "Financials", "USA", 150000, "Investment banking and securities."),
            ("NEE", "NextEra Energy", "Energy", "USA", 160000, "Renewable energy and electric utility company.")
        };

        for (var i = 0; i < companyData.Length; i++)
        {
            var c = companyData[i];
            Companies.Add(new Company
            {
                Id = i + 1,
                Symbol = c.Symbol,
                Name = c.Name,
                Sector = c.Sector,
                Country = c.Country,
                MarketCap = c.MarketCap,
                Description = c.Description
            });
        }

        var ratingData = new (int idx, string Grade, string Outlook, int daysAgo, string Analyst, string Notes)[]
        {
            (0, "AA-", "Stable", 30, "S. Chen", "Strong balance sheet and recurring revenue streams."),
            (1, "AAA", "Stable", 45, "M. Patel", "Market leader in cloud and enterprise software."),
            (2, "A+", "Stable", 20, "J. Williams", "Diversified revenue with solid capital ratios."),
            (3, "A", "Negative", 15, "R. Gomez", "Commodity price exposure remains a key risk."),
            (4, "AA", "Stable", 60, "L. Kim", "Healthcare diversification supports credit quality."),
            (5, "A+", "Stable", 25, "D. Brown", "Dominant market position in managed care."),
            (6, "AA-", "Stable", 40, "A. Singh", "Consistent cash flows from global brands."),
            (7, "A", "Stable", 35, "K. Nguyen", "Housing cycle sensitivity noted."),
            (8, "AA", "Stable", 50, "T. Okafor", "Network effects provide durable moat."),
            (9, "AA-", "Stable", 28, "E. Martin", "Strong payment volume growth globally."),
            (10, "A-", "Positive", 10, "S. Chen", "AI demand driving exceptional growth."),
            (11, "AA-", "Stable", 22, "M. Patel", "Advertising resilience and cloud expansion."),
            (12, "A+", "Stable", 18, "J. Williams", "AWS margins offset retail investments."),
            (13, "BB+", "Stable", 12, "R. Gomez", "Execution risk in competitive EV market."),
            (14, "AA+", "Stable", 55, "L. Kim", "Exceptional capital allocation track record."),
            (15, "A", "Positive", 8, "D. Brown", "Pipeline strength in GLP-1 therapies."),
            (16, "A+", "Stable", 33, "A. Singh", "Integrated model supports cash generation."),
            (17, "AA-", "Stable", 42, "K. Nguyen", "Global brand portfolio with pricing power."),
            (18, "A+", "Stable", 38, "T. Okafor", "Snacks segment diversification."),
            (19, "BBB+", "Stable", 14, "E. Martin", "Patent cliff partially offset by pipeline."),
            (20, "AA-", "Stable", 27, "S. Chen", "Membership model drives loyalty."),
            (21, "AA", "Stable", 31, "M. Patel", "Scale advantages in retail logistics."),
            (22, "A-", "Stable", 19, "J. Williams", "Interest rate sensitivity on NIM."),
            (23, "A", "Stable", 24, "R. Gomez", "Trading revenue volatility."),
            (24, "A+", "Positive", 16, "L. Kim", "Renewable transition leadership.")
        };

        for (var i = 0; i < ratingData.Length; i++)
        {
            var r = ratingData[i];
            var rating = new Rating
            {
                Id = i + 1,
                CompanyId = Companies[r.idx].Id,
                Grade = r.Grade,
                Outlook = r.Outlook,
                RatedDate = DateTime.UtcNow.AddDays(-r.daysAgo),
                Analyst = r.Analyst,
                Notes = r.Notes
            };
            Ratings.Add(rating);
            Companies[r.idx].Rating = rating;
        }

        var esgData = new (int idx, int E, int S, int G, int Total)[]
        {
            (0, 72, 68, 85, 75), (1, 78, 82, 90, 83), (2, 65, 74, 80, 73), (3, 42, 58, 70, 57),
            (4, 70, 76, 82, 76), (5, 68, 72, 78, 73), (6, 75, 80, 84, 80), (7, 62, 70, 76, 69),
            (8, 60, 78, 88, 75), (9, 58, 76, 86, 73), (10, 55, 72, 82, 70), (11, 74, 70, 78, 74),
            (12, 68, 65, 72, 68), (13, 88, 62, 65, 72), (14, 58, 68, 92, 73), (15, 66, 74, 80, 73),
            (16, 48, 60, 72, 60), (17, 72, 78, 80, 77), (18, 70, 76, 78, 75), (19, 64, 72, 76, 71),
            (20, 62, 74, 78, 71), (21, 68, 70, 74, 71), (22, 60, 68, 72, 67), (23, 55, 65, 70, 63),
            (24, 92, 75, 82, 83)
        };

        for (var i = 0; i < esgData.Length; i++)
        {
            var e = esgData[i];
            var score = new EsgScore
            {
                Id = i + 1,
                CompanyId = Companies[e.idx].Id,
                Environmental = e.E,
                Social = e.S,
                Governance = e.G,
                TotalScore = e.Total,
                AsOfDate = DateTime.UtcNow.AddDays(-7)
            };
            EsgScores.Add(score);
            Companies[e.idx].EsgScore = score;
        }

        var sp500 = new MarketIndex { Id = 1, Symbol = "SPX", Name = "S&P 500", CurrentValue = 5284.52m, ChangePercent = 0.68m };
        var spTech = new MarketIndex { Id = 2, Symbol = "SPXT", Name = "S&P 500 Technology", CurrentValue = 4125.30m, ChangePercent = 1.12m };
        var spEnergy = new MarketIndex { Id = 3, Symbol = "SPXE", Name = "S&P 500 Energy", CurrentValue = 685.40m, ChangePercent = -0.45m };
        Indices.AddRange([sp500, spTech, spEnergy]);

        var sp500Weights = new (int idx, decimal weight)[]
        {
            (0, 7.2m), (1, 6.8m), (10, 5.5m), (11, 4.2m), (12, 3.8m),
            (13, 2.1m), (2, 1.9m), (5, 1.7m), (8, 1.5m), (14, 1.4m),
            (4, 1.3m), (15, 1.2m), (21, 1.1m), (6, 1.0m), (9, 0.9m)
        };

        var constituentId = 1;
        foreach (var w in sp500Weights)
        {
            IndexConstituents.Add(new IndexConstituent
            {
                Id = constituentId++,
                IndexId = sp500.Id,
                CompanyId = Companies[w.idx].Id,
                Weight = w.weight,
                AsOfDate = DateTime.UtcNow
            });
        }

        var random = new Random(42);
        var baseValue = 4800m;
        var historyId = 1;
        for (var i = 90; i >= 0; i--)
        {
            baseValue += (decimal)(random.NextDouble() * 40 - 18);
            IndexHistory.Add(new IndexHistory
            {
                Id = historyId++,
                IndexId = sp500.Id,
                Date = DateTime.UtcNow.Date.AddDays(-i),
                Value = Math.Round(baseValue, 2)
            });
        }

        WatchlistItems.AddRange([
            new WatchlistItem { Id = 1, UserId = demoUser.Id, CompanyId = Companies[0].Id, AddedAt = DateTime.UtcNow.AddDays(-5) },
            new WatchlistItem { Id = 2, UserId = demoUser.Id, CompanyId = Companies[10].Id, AddedAt = DateTime.UtcNow.AddDays(-3) },
            new WatchlistItem { Id = 3, UserId = demoUser.Id, CompanyId = Companies[2].Id, AddedAt = DateTime.UtcNow.AddDays(-1) }
        ]);
    }
}
