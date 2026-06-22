using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using MarketPulse.Core.DTOs;
using MarketPulse.Infrastructure.Data;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace MarketPulse.Infrastructure.Services;

public class AuthService(InMemoryDataStore store, IConfiguration config)
{
    public Task<LoginResponse?> LoginAsync(LoginRequest request)
    {
        var user = store.Users.FirstOrDefault(u => u.Email == request.Email);
        if (user is null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
            return Task.FromResult<LoginResponse?>(null);

        var token = GenerateToken(user);
        return Task.FromResult<LoginResponse?>(new LoginResponse(token, user.Name, user.Email));
    }

    private string GenerateToken(Core.Entities.User user)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:Key"]!));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Name, user.Name)
        };

        var token = new JwtSecurityToken(
            issuer: config["Jwt:Issuer"],
            audience: config["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddHours(8),
            signingCredentials: creds);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
