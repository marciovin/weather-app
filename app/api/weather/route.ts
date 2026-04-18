export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const city = searchParams.get('city')
  const lat = searchParams.get('lat')
  const lon = searchParams.get('lon')

  const base = 'https://api.openweathermap.org/data/2.5/weather'
  const key = process.env.OPENWEATHER_API_KEY
  const query = city ? `q=${city}` : `lat=${lat}&lon=${lon}`

  const res = await fetch(`${base}?${query}&appid=${key}&units=metric&lang=pt_br`)
  const data = await res.json()
  return Response.json(data)
}