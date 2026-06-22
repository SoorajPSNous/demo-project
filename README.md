# MarketPulse — Intelligence Hub

A full-stack financial intelligence demo application built for **S&P Global** client presentations and as a base input for **Astra/DevX**.

## Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, TypeScript, Vite, Tailwind CSS, Recharts |
| Backend | ASP.NET Core 10 Web API |
| Database | In-memory (no setup required) |
| Auth | JWT Bearer tokens |

## Features

- **Dashboard** — KPIs, S&P 500 trend chart, sector breakdown, top companies
- **Company Explorer** — Search/filter 25 companies with credit ratings
- **ESG Insights** — Leaderboard with E/S/G breakdown charts
- **Index Tracker** — S&P 500 and sector indices with constituents
- **Watchlist** — Save and monitor companies

## Demo Credentials

```
Email:    demo@spglobal.com
Password: Demo@123
```

## Prerequisites

- [.NET 10 SDK](https://dotnet.microsoft.com/download)
- [Node.js 18+](https://nodejs.org/)

No database required — all demo data lives in memory and loads when the API starts.

## Quick Start

### 1. Backend

```bash
cd backend
dotnet run --project MarketPulse.Api
```

API runs at **http://localhost:5293**

Demo data (25 companies, ratings, ESG, indices) is loaded automatically in memory on startup.

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

App runs at **http://localhost:5173**

## Project Structure

```
project/
├── backend/
│   ├── MarketPulse.Api/          # Web API controllers & startup
│   ├── MarketPulse.Core/         # Entities & DTOs
│   └── MarketPulse.Infrastructure/  # EF Core, services, seed data
└── frontend/
    └── src/
        ├── api/                  # API client
        ├── components/           # UI components
        ├── context/              # Auth context
        └── pages/                # Route pages
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Authenticate |
| GET | `/api/dashboard/summary` | Dashboard data |
| GET | `/api/companies` | Search companies |
| GET | `/api/companies/{id}` | Company detail |
| GET | `/api/esg/leaderboard` | ESG rankings |
| GET | `/api/indices` | List indices |
| GET | `/api/indices/{id}/constituents` | Index constituents |
| GET | `/api/watchlist` | User watchlist |
| POST | `/api/watchlist` | Add to watchlist |
| DELETE | `/api/watchlist/{companyId}` | Remove from watchlist |

