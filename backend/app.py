from fastapi import FastAPI
import requests

app = FastAPI()

GEOCODE_API = "https://geocode.maps.co/search?q={zipcode} USA&api_key={GEOCODE_API_KEY}"
WEATHER_API = "https://api.weather.gov/points/{lat},{lon}"


@app.get("/predict/{zipcode}")
def get_prediction(zipcode: str):
    try:
        geo_response = requests.get(GEOCODE_API.format(zipcode=zipcode, GEOCODE_API_KEY="67b10bf57f1f2832936557ioy877f2e"))
        geo_response.raise_for_status()  # Raise an exception for 4xx/5xx errors
        geo_data = geo_response.json()
        lat, lon = geo_data[0]["lat"], geo_data[0]["lon"]
    except requests.exceptions.RequestException as e:
        return {"error": f"Geocoding API request failed: {e}"}

    try:
        weather_response = requests.get(WEATHER_API.format(lat=lat, lon=lon))
        weather_response.raise_for_status()
        weather_data = weather_response.json()
    except requests.exceptions.RequestException as e:
        return {"error": f"Weather API request failed: {e}"}
    
    try:
        weather_forecast_response = requests.get(weather_data['properties']['forecast']);
        weather_forecast_response.raise_for_status()
        weather_forecast = weather_forecast_response.json();
    except requests.exceptions.RequestException as e:
        return {"error:" f"Weather API request failed: {e}"}
    
    forecast_periods = weather_forecast['properties']['periods']
    temps = [period['temperature'] for period in forecast_periods]
    min_temp = min(temps)
    max_temp = max(temps)
    avg_temp = sum(temps) / len(temps)

    # for now hardcode input
    # tavg, tmin, tmax, prcp, wdir, wspd, pres
    input_ml = [avg_temp, min_temp, max_temp, 0, 342, 15.1, 1002.7]
    # Hardcoded prediction value for now
    prediction = "85 percent"
    return {"zipcode": zipcode, "prediction": prediction, "weather_data": input_ml}


# Run with: uvicorn filename:app --reload
