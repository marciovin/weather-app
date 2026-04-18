'use client'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { MapIcon } from 'lucide-react'
import { useState } from 'react'

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

     
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-start pt-20 px-4">
    {/*Header*/}
    <div className="flex gap-2 w-full max-w-md">
    <Input placeholder="Pesquisar cidade..." className="flex-1" />
    <Button onClick={handleGeolocate}>
      <MapIcon /> Usar localização
    </Button>

  </div>

    {/*content*/}
    <div className='flex gap-2 w-full max-w-md"'>
      <Card>
        pepa
      </Card>
    </div>

  {weatherData && <pre>{JSON.stringify(weatherData, null, 2)}</pre>}
</div>
  )
}