import SearchBox from "./SearchBox";
import InfoBox from "./InfoBox";
import { useState, useCallback } from "react";
import "./App.css";
import "./SearchBox.css";

function App() {
  const [weatherInfo, setWeatherInfo] = useState(null);

  const updateInfo = useCallback((newInfo) => {
    setWeatherInfo(newInfo);
  }, []);

  // Helper to determine the weather theme
  const getWeatherTheme = () => {
    if (!weatherInfo) return "default";
    const desc = weatherInfo.weather ? weatherInfo.weather.toLowerCase() : "";
    const temp = weatherInfo.temp;

    if (desc.includes("rain") || desc.includes("drizzle") || desc.includes("thunderstorm") || desc.includes("storm")) {
      return "rainy";
    }
    if (desc.includes("snow") || desc.includes("ice") || desc.includes("freeze") || temp < 15) {
      return "cold";
    }
    if (temp > 30 || desc.includes("hot") || desc.includes("sunny") || (desc.includes("clear") && temp > 28)) {
      return "hot";
    }
    if (desc.includes("cloud") || desc.includes("mist") || desc.includes("haze") || desc.includes("fog") || desc.includes("smoke")) {
      return "cloudy";
    }
    return "default";
  };

  const theme = getWeatherTheme();

  // Define blob colors for each theme to match the weather atmosphere
  const blobColors = {
    default: {
      blob1: "rgba(99, 102, 241, 0.15)", // Indigo
      blob2: "rgba(59, 130, 246, 0.15)", // Blue
      blob3: "rgba(147, 51, 234, 0.1)"   // Purple
    },
    hot: {
      blob1: "rgba(239, 68, 68, 0.2)",   // Sunset Red
      blob2: "rgba(245, 158, 11, 0.2)",  // Solar Amber
      blob3: "rgba(234, 88, 12, 0.15)"   // Warm Orange
    },
    cold: {
      blob1: "rgba(6, 182, 212, 0.2)",   // Cyan Ice
      blob2: "rgba(255, 255, 255, 0.15)", // Frosty White
      blob3: "rgba(59, 130, 246, 0.12)"  // Soft Blue
    },
    rainy: {
      blob1: "rgba(79, 70, 229, 0.15)",   // Deep Violet
      blob2: "rgba(30, 41, 59, 0.3)",    // Dark Storm Slate
      blob3: "rgba(107, 114, 128, 0.2)"  // Rain Grey
    },
    cloudy: {
      blob1: "rgba(148, 163, 184, 0.2)", // Misty Grey
      blob2: "rgba(129, 140, 248, 0.15)", // Lavender Cloud
      blob3: "rgba(75, 85, 99, 0.18)"    // Hazy Slate
    }
  };

  const currentBlobs = blobColors[theme] || blobColors.default;

  return (
    <div style={{ position: "relative", width: "100%", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      {/* Animated Atmospheric Background Blobs */}
      <div 
        className="bg-blob blob-1" 
        style={{ backgroundColor: currentBlobs.blob1 }} 
      />
      <div 
        className="bg-blob blob-2" 
        style={{ backgroundColor: currentBlobs.blob2 }} 
      />
      <div 
        className="bg-blob blob-3" 
        style={{ backgroundColor: currentBlobs.blob3 }} 
      />

      {/* Main Glassmorphic Dashboard */}
      <div className="glass-card">
        <h1 style={{ 
          fontSize: "2.2rem", 
          fontWeight: 700, 
          textAlign: "center", 
          marginBottom: "1.5rem",
          background: "linear-gradient(to right, #ffffff, #a5b4fc)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}>
          Atmosphere
        </h1>
        <SearchBox updateInfo={updateInfo} />
        <InfoBox info={weatherInfo} />
      </div>
    </div>
  );
}

export default App;
