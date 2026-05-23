# Atmosphere — Weather App

A clean, glassmorphic weather app built with React and Vite. Search any city to get real-time weather data powered by the OpenWeatherMap API.

![React](https://img.shields.io/badge/React-19-61dafb?logo=react) ![Vite](https://img.shields.io/badge/Vite-7-646cff?logo=vite) ![MUI](https://img.shields.io/badge/MUI-7-007fff?logo=mui)

## Features

- Real-time weather data for any city worldwide
- Temperature, feels like, humidity, wind speed, min/max
- Weather-aware background that changes color based on conditions (hot, cold, rainy, cloudy)
- Glassmorphic UI with MUI components
- Defaults to Delhi on load

## Tech Stack

- **React 19** — UI
- **Vite 7** — build tool and dev server
- **MUI v7** — component library
- **OpenWeatherMap API** — weather data

## Getting Started

### Prerequisites

- Node.js 18+
- An [OpenWeatherMap API key](https://openweathermap.org/api) (free tier works)

### Setup

1. Clone the repo and navigate into the project:

```bash
git clone https://github.com/your-username/weatherApp.git
cd weatherApp/weather-react
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the `weather-react` directory:

```
VITE_API_KEY=your_openweathermap_api_key_here
```

4. Start the dev server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Environment Variables

| Variable | Description |
|---|---|
| `VITE_API_KEY` | Your OpenWeatherMap API key |

> The `.env` file is gitignored and must be created locally. Never commit your API key.
