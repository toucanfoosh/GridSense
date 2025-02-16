from fastapi import FastAPI
import requests

app = FastAPI()

GEOCODE_API = "https://geocode.maps.co/search?q={zipcode} USA&api_key=YOUR_API_KEY"
WEATHER_API = "https://api.weather.gov/points/{lat},{lon}"


@app.get("/predict/{zipcode}")
def get_prediction(zipcode: str):
    geo_response = requests.get(GEOCODE_API.format(zipcode=zipcode)).json()
    lat, lon = geo_response[0]["lat"], geo_response[0]["lon"]

    weather_response = requests.get(WEATHER_API.format(lat=lat, lon=lon)).json()

    # Hardcoded prediction value for now
    prediction = "85 percent"

    return {"zipcode": zipcode, "prediction": prediction}


# Run with: uvicorn filename:app --reload
