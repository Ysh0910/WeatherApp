import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import { useState, useEffect, useCallback } from "react";
import "./SearchBox.css";

export default function SearchBox({ updateInfo }) {
    const API_URL = "https://api.openweathermap.org/data/2.5/weather";
    const API_KEY = import.meta.env.VITE_API_KEY;

    const [city, setCity] = useState("");
    const [error, setError] = useState(false);

    const getWeatherInfo = useCallback(async (cityToSearch) => {
        try {
            setError(false);
            let response = await fetch(`${API_URL}?q=${cityToSearch}&appid=${API_KEY}&units=metric`);
            if (!response.ok) {
                throw new Error("City not found");
            }
            let jsonResponse = await response.json();
            let result = {
                city: jsonResponse.name,
                temp: jsonResponse.main.temp,
                tempMin: jsonResponse.main.temp_min,
                tempMax: jsonResponse.main.temp_max,
                humidity: jsonResponse.main.humidity,
                feelsLike: jsonResponse.main.feels_like,
                weather: jsonResponse.weather[0].description,
                windSpeed: jsonResponse.wind ? jsonResponse.wind.speed : 0,
                country: jsonResponse.sys ? jsonResponse.sys.country : ""
            };
            updateInfo(result);
        } catch (err) {
            console.error("Failed to fetch weather info:", err);
            setError(true);
        }
    }, [API_KEY, updateInfo]);

    // Load a default city on initial mount only
    useEffect(() => {
        getWeatherInfo("Delhi");
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    let handleChange = (evt) => {
        setCity(evt.target.value);
        if (error) setError(false);
    };

    let handleSubmit = (evt) => {
        evt.preventDefault();
        if (city.trim()) {
            getWeatherInfo(city.trim());
            setCity("");
        }
    };

    return (
        <div className="SearchBox">
            <form onSubmit={handleSubmit} className="search-form">
                <TextField
                    id="city"
                    label="Search City..."
                    variant="outlined"
                    required
                    value={city}
                    onChange={handleChange}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon sx={{ color: 'rgba(255, 255, 255, 0.5)' }} />
                                </InputAdornment>
                            ),
                        },
                    }}
                    sx={{
                        '& label': {
                            color: 'rgba(255, 255, 255, 0.6)',
                            fontFamily: 'inherit',
                        },
                        '& label.Mui-focused': {
                            color: '#a5b4fc',
                        },
                        '& .MuiOutlinedInput-root': {
                            color: '#ffffff',
                            backgroundColor: 'rgba(255, 255, 255, 0.03)',
                            borderRadius: '16px',
                            fontFamily: 'inherit',
                            '& fieldset': {
                                borderColor: 'rgba(255, 255, 255, 0.1)',
                            },
                            '&:hover fieldset': {
                                borderColor: 'rgba(255, 255, 255, 0.25)',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#818cf8',
                            },
                        },
                    }}
                />

                <Button
                    variant="contained"
                    type="submit"
                    className="search-btn"
                    sx={{
                        backgroundColor: '#6366f1',
                        color: '#ffffff',
                        padding: '10px 24px',
                        borderRadius: '16px',
                        fontWeight: 600,
                        textTransform: 'none',
                        fontFamily: 'inherit',
                        fontSize: '1rem',
                        boxShadow: 'none',
                        transition: 'none',
                        '&:hover': {
                            backgroundColor: '#4f46e5',
                            boxShadow: 'none',
                        },
                    }}
                >
                    Search
                </Button>
            </form>

            {error && (
                <Alert
                    severity="error"
                    variant="filled"
                    onClose={() => setError(false)}
                    sx={{
                        marginTop: '1.5rem',
                        borderRadius: '16px',
                        backgroundColor: 'rgba(239, 68, 68, 0.2)',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        color: '#fca5a5',
                        fontFamily: 'inherit',
                        fontWeight: 500,
                        '& .MuiAlert-icon': { color: '#ef4444' },
                        '& .MuiAlert-action': { color: '#fca5a5' }
                    }}
                >
                    Oops! No such location found in our records.
                </Alert>
            )}
        </div>
    );
}
