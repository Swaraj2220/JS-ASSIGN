const cityInput = document.getElementById("city")
const output = document.getElementById("output")

async function getWeather() {
  const cityName = cityInput.value.trim()

  if (!cityName) {
    output.textContent = "Please enter a city name"
    return
  }

  try {
    const location = await fetchLocation(cityName)
    if (!location) {
      output.textContent = "City not found"
      return
    }

    const weather = await fetchWeather(location.latitude, location.longitude)
    displayWeather(location.name, location.country, weather)

  } catch (err) {
    output.textContent = "Error fetching weather data"
  }
}

async function fetchLocation(city) {
  const res = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`
  )
  const data = await res.json()
  return data.results ? data.results[0] : null
}

async function fetchWeather(lat, lon) {
  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
  )
  const data = await res.json()
  return data.current_weather
}

function displayWeather(name, country, weather) {
  output.textContent =
`📍 ${name}, ${country}
🌡 Temperature: ${weather.temperature}°C
🌬 Wind Speed: ${weather.windspeed} km/h`
}

function handleEnter(e) {
  if (e.key === "Enter") getWeather()
}

window.onload = function () {
  cityInput.focus()
}