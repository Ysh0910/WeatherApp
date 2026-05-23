import WbSunnyIcon from '@mui/icons-material/WbSunny';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import CloudIcon from '@mui/icons-material/Cloud';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import AirIcon from '@mui/icons-material/Air';
import InfoIcon from '@mui/icons-material/Info';
import CircularProgress from '@mui/material/CircularProgress';
import "./InfoBox.css";

export default function InfoBox({ info }) {
    // Show a premium glass loading screen when info is not available yet
    if (!info) {
        return (
            <div className="InfoBox-loading">
                <CircularProgress size={45} sx={{ color: '#818cf8', marginBottom: '1rem' }} />
                <p style={{ opacity: 0.6, fontSize: '0.95rem', fontWeight: 500 }}>
                    Detecting atmospheric signature...
                </p>
            </div>
        );
    }

    // Helper function to extract weather assets & recommendation text
    const getWeatherAssets = () => {
        const desc = info.weather ? info.weather.toLowerCase() : "";
        const temp = info.temp;

        if (desc.includes("rain") || desc.includes("drizzle") || desc.includes("thunderstorm") || desc.includes("storm")) {
            return {
                icon: <ThunderstormIcon sx={{ fontSize: 42, color: '#60a5fa' }} />,
                bgGlow: 'rgba(59, 130, 246, 0.12)',
                borderStyle: 'rgba(59, 130, 246, 0.3)',
                message: "Don't forget your umbrella today!"
            };
        }
        if (desc.includes("snow") || desc.includes("ice") || desc.includes("freeze") || temp < 15) {
            return {
                icon: <AcUnitIcon sx={{ fontSize: 42, color: '#a5f3fc' }} />,
                bgGlow: 'rgba(6, 182, 212, 0.12)',
                borderStyle: 'rgba(6, 182, 212, 0.3)',
                message: "Brrr! Bundle up in warm layers."
            };
        }
        if (temp > 30 || desc.includes("hot") || desc.includes("sunny") || (desc.includes("clear") && temp > 28)) {
            return {
                icon: <WbSunnyIcon sx={{ fontSize: 42, color: '#fbbf24' }} />,
                bgGlow: 'rgba(245, 158, 11, 0.12)',
                borderStyle: 'rgba(245, 158, 11, 0.3)',
                message: "Stay hydrated! It is warm outside."
            };
        }
        if (desc.includes("cloud") || desc.includes("mist") || desc.includes("haze") || desc.includes("fog") || desc.includes("smoke")) {
            return {
                icon: <CloudIcon sx={{ fontSize: 42, color: '#cbd5e1' }} />,
                bgGlow: 'rgba(148, 163, 184, 0.12)',
                borderStyle: 'rgba(148, 163, 184, 0.3)',
                message: "Expect overcast or hazy skies today."
            };
        }
        return {
            icon: <WbSunnyIcon sx={{ fontSize: 42, color: '#818cf8' }} />,
            bgGlow: 'rgba(99, 102, 241, 0.12)',
            borderStyle: 'rgba(99, 102, 241, 0.3)',
            message: "Atmosphere is pleasant. Enjoy your day!"
        };
    };

    const assets = getWeatherAssets();

    return (
        <div className="InfoBox">
            {/* Header info */}
            <div className="weather-header">
                <h3 className="city-name">
                    {info.city}{info.country ? `, ${info.country}` : ""}
                </h3>
                <span className="weather-desc">
                    {info.weather}
                </span>
            </div>

            {/* Giant Temp & Icon Card */}
            <div className="weather-main" style={{ boxShadow: `0 8px 24px ${assets.bgGlow}` }}>
                <div className="temp-display">
                    {Math.round(info.temp)}
                    <span className="temp-unit">°C</span>
                </div>
                <div className="main-icon-container" style={{ boxShadow: `inset 0 0 10px ${assets.bgGlow}` }}>
                    {assets.icon}
                </div>
            </div>

            {/* Metrics Dashboard Grid */}
            <div className="weather-grid">
                <div className="stat-card">
                    <div className="stat-icon">
                        <ThermostatIcon sx={{ color: '#818cf8' }} />
                    </div>
                    <div className="stat-details">
                        <span className="stat-label">Feels Like</span>
                        <span className="stat-value">{Math.round(info.feelsLike)}°C</span>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">
                        <WaterDropIcon sx={{ color: '#38bdf8' }} />
                    </div>
                    <div className="stat-details">
                        <span className="stat-label">Humidity</span>
                        <span className="stat-value">{info.humidity}%</span>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">
                        <ThermostatIcon sx={{ color: '#f43f5e' }} />
                    </div>
                    <div className="stat-details">
                        <span className="stat-label">Min / Max</span>
                        <span className="stat-value">{Math.round(info.tempMin)}° / {Math.round(info.tempMax)}°</span>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">
                        <AirIcon sx={{ color: '#34d399' }} />
                    </div>
                    <div className="stat-details">
                        <span className="stat-label">Wind Speed</span>
                        <span className="stat-value">{info.windSpeed} m/s</span>
                    </div>
                </div>
            </div>

            {/* Friendly recommendation banner */}
            <div className="weather-footer" style={{ borderColor: assets.borderStyle }}>
                <InfoIcon sx={{ fontSize: 18, color: '#818cf8' }} />
                <span>{assets.message}</span>
            </div>
        </div>
    );
}