'use client'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { MapIcon } from 'lucide-react'
import { useState } from 'react'
import { ThemeToggle } from '@/components/ThemeToggle'


export default function Home() {
  const [weatherData, setWeatherData] = useState(null)

  const handleGeolocate = () => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      fetch(`/api/weather?lat=${coords.latitude}&lon=${coords.longitude}`)
        .then(r => r.json())
        .then(setWeatherData)
    })
  }

  return (

     
    <div className="min-h-screen flex flex-col items-center justify-start pt-20 px-4">
    {/*Header*/}
    <div className="flex gap-4 w-full max-w-md">
      <Input placeholder="Pesquisar cidade..." className="flex-1" />
      <Button onClick={handleGeolocate}>
        <MapIcon /> Usar localização
      </Button>
      <ThemeToggle />
    </div>


    {/*cards*/}

  <div className="flex columns-3 justify-center w-full mt-64 px-4 bg-sky gap-7">
  <Card className="w-full max-w-sm rounded-xl border p-6">

    <div className="flex items-start justify-between mb-5">
      <div>
        <p className="text-lg font-medium">Resende</p>
        <p className="text-sm text-muted-foreground">Rio de Janeiro, BR</p>
      </div>
      <span className="text-xs text-muted-foreground mt-1">agora</span>
    </div>

    <div className="flex items-end justify-between mb-5">
      <div>
        <p className="text-5xl font-medium leading-none">20°C</p>
        <p className="text-sm text-muted-foreground mt-2">nuvens dispersas</p>
      </div>
    </div>

    <div className="grid grid-cols-3 gap-2 pt-4 border-t">
      <div className="bg-muted rounded-lg p-2 text-center">
        <p className="text-[11px] text-muted-foreground uppercase tracking-wide mb-1">Sensação</p>
        <p className="text-sm font-medium">20°C</p>
      </div>
      <div className="bg-muted rounded-lg p-2 text-center">
        <p className="text-[11px] text-muted-foreground uppercase tracking-wide mb-1">Umidade</p>
        <p className="text-sm font-medium">82%</p>
      </div>
      <div className="bg-muted rounded-lg p-2 text-center">
        <p className="text-[11px] text-muted-foreground uppercase tracking-wide mb-1">Vento</p>
        <p className="text-sm font-medium">4 km/h</p>
      </div>
    </div>

  </Card>

  <Card className="w-full max-w-sm rounded-xl border p-6">

    <div className="flex items-start justify-between mb-5">
      <div>
        <p className="text-lg font-medium">Resende</p>
        <p className="text-sm text-muted-foreground">Rio de Janeiro, BR</p>
      </div>
      <span className="text-xs text-muted-foreground mt-1">agora</span>
    </div>

    <div className="flex items-end justify-between mb-5">
      <div>
        <p className="text-5xl font-medium leading-none">20°C</p>
        <p className="text-sm text-muted-foreground mt-2">nuvens dispersas</p>
      </div>
    </div>

    <div className="grid grid-cols-3 gap-2 pt-4 border-t">
      <div className="bg-muted rounded-lg p-2 text-center">
        <p className="text-[11px] text-muted-foreground uppercase tracking-wide mb-1">Sensação</p>
        <p className="text-sm font-medium">20°C</p>
      </div>
      <div className="bg-muted rounded-lg p-2 text-center">
        <p className="text-[11px] text-muted-foreground uppercase tracking-wide mb-1">Umidade</p>
        <p className="text-sm font-medium">82%</p>
      </div>
      <div className="bg-muted rounded-lg p-2 text-center">
        <p className="text-[11px] text-muted-foreground uppercase tracking-wide mb-1">Vento</p>
        <p className="text-sm font-medium">4 km/h</p>
      </div>
    </div>

  </Card>

  <Card className="w-full max-w-sm rounded-xl border p-6">

    <div className="flex items-start justify-between mb-5">
      <div>
        <p className="text-lg font-medium">Resende</p>
        <p className="text-sm text-muted-foreground">Rio de Janeiro, BR</p>
      </div>
      <span className="text-xs text-muted-foreground mt-1">agora</span>
    </div>

    <div className="flex items-end justify-between mb-5">
      <div>
        <p className="text-5xl font-medium leading-none">20°C</p>
        <p className="text-sm text-muted-foreground mt-2">nuvens dispersas</p>
      </div>
    </div>

    <div className="grid grid-cols-3 gap-2 pt-4 border-t">
      <div className="bg-muted rounded-lg p-2 text-center">
        <p className="text-[11px] text-muted-foreground uppercase tracking-wide mb-1">Sensação</p>
        <p className="text-sm font-medium">20°C</p>
      </div>
      <div className="bg-muted rounded-lg p-2 text-center">
        <p className="text-[11px] text-muted-foreground uppercase tracking-wide mb-1">Umidade</p>
        <p className="text-sm font-medium">82%</p>
      </div>
      <div className="bg-muted rounded-lg p-2 text-center">
        <p className="text-[11px] text-muted-foreground uppercase tracking-wide mb-1">Vento</p>
        <p className="text-sm font-medium">4 km/h</p>
      </div>
    </div>

  </Card>
  </div>

  {weatherData && <pre>{JSON.stringify(weatherData, null, 2)}</pre>}
</div>
  )
}