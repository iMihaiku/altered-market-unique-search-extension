let cachedAccessToken = null

const fetchAccessToken = async () => {
  if (cachedAccessToken) return cachedAccessToken
  
  const sessionUrl = 'https://www.altered.gg/api/auth/session'
  try {
    const response = await fetch(sessionUrl)
    if (!response.ok) {
      throw new Error(`Error en la solicitud de sesión: ${response.status}`)
    }
    const sessionData = await response.json()
    cachedAccessToken = sessionData?.accessToken || null
    return cachedAccessToken
  } catch (error) {
    console.error('Error fetching access token:', error)
    return null
  }
}