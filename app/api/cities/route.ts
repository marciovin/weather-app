export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const query = searchParams.get('q')

  const key = process.env.OPENWEATHER_API_KEY
  const res = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${key}`
  )
  const data = await res.json()
  return Response.json(data)
}
