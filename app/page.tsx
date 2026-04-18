'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { MapIcon } from 'lucide-react'
import { ThemeToggle } from '@/components/ThemeToggle'

interface WeatherData {
  name: string
  sys: { country: string }
  main: { temp: number; feels_like: number; humidity: number }
  weather: { description: string }[]
  wind: { speed: number }
}

interface CitySuggestion {
  name: string
  state?: string
  country: string
  lat: number
  lon: number
}

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [city, setCity] = useState('')
  const [suggestions, setSuggestions] = useState<CitySuggestion[]>([])

  const handleGeolocate = () => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      fetch(`/api/weather?lat=${coords.latitude}&lon=${coords.longitude}`)
        .then(r => r.json())
        .then(setWeatherData)
    })
  }

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && city.trim()) {
      fetch(`/api/weather?city=${city}`)
        .then(r => r.json())
        .then(setWeatherData)
      setSuggestions([])
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setCity(value)

    if (value.length < 3) {
      setSuggestions([])
      return
    }

    fetch(`/api/cities?q=${value}`)
      .then(r => r.json())
      .then(setSuggestions)
  }

  const handleSelectCity = (suggestion: CitySuggestion) => {
    setCity(suggestion.name)
    setSuggestions([])
    fetch(`/api/weather?lat=${suggestion.lat}&lon=${suggestion.lon}`)
      .then(r => r.json())
      .then(setWeatherData)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-start pt-20 px-4">

      {/* header */}
      <div className="flex gap-2 w-full max-w-md relative">
        <div className="relative flex-1">
          <Input
            placeholder="Pesquisar cidade..."
            value={city}
            onChange={handleInputChange}
            onKeyDown={handleSearch}
          />
          {suggestions.length > 0 && (
            <div className="absolute top-full mt-1 w-full bg-card border rounded-xl z-10 overflow-hidden">
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => handleSelectCity(s)}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors"
                >
                  {s.name}{s.state ? `, ${s.state}` : ''}, {s.country}
                </button>
              ))}
            </div>
          )}
        </div>
        <Button onClick={handleGeolocate}>
          <MapIcon /> Usar localização
        </Button>
        <ThemeToggle />
      </div>

      {/* card */}
      {weatherData && (
        <div className="flex justify-center w-full mt-16 px-4">
          <Card className="w-full max-w-sm rounded-xl bg-card border p-6">

            <div className="flex items-start justify-between mb-5">
              <div>
                <p className="text-lg font-medium">{weatherData.name}</p>
                <p className="text-sm text-muted-foreground">{weatherData.sys.country}</p>
              </div>
              <span className="text-xs text-muted-foreground mt-1">agora</span>
            </div>

            <div className="mb-5">
              <p className="text-5xl font-medium leading-none">
                {Math.round(weatherData.main.temp)}°C
              </p>
              <p className="text-sm text-muted-foreground mt-2 capitalize">
                {weatherData.weather[0].description}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-4 border-t">
              <div className="bg-muted rounded-lg p-2 text-center">
                <p className="text-[11px] text-muted-foreground uppercase tracking-wide mb-1">Sensação</p>
                <p className="text-sm font-medium">{Math.round(weatherData.main.feels_like)}°C</p>
              </div>
              <div className="bg-muted rounded-lg p-2 text-center">
                <p className="text-[11px] text-muted-foreground uppercase tracking-wide mb-1">Umidade</p>
                <p className="text-sm font-medium">{weatherData.main.humidity}%</p>
              </div>
              <div className="bg-muted rounded-lg p-2 text-center">
                <p className="text-[11px] text-muted-foreground uppercase tracking-wide mb-1">Vento</p>
                <p className="text-sm font-medium">{Math.round(weatherData.wind.speed * 3.6)} km/h</p>
              </div>
            </div>

          </Card>
        </div>
      )}

    </div>
  )
}