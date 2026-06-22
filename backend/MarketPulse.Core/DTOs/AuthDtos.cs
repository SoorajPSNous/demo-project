namespace MarketPulse.Core.DTOs;

public record LoginRequest(string Email, string Password);
public record LoginResponse(string Token, string Name, string Email);
public record UserDto(int Id, string Name, string Email);
