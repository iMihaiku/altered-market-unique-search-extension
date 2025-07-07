// Gestión de cartas
const fetchCardsData = async (params, accessToken) => {
  const selectedLanguage = document.querySelector('#selectorIdioma')?.value || 'es-es'
  params.set('locale', selectedLanguage)
  
  const apiUrl = `https://api.altered.gg/cards?${params.toString()}`
  try {
    const response = await fetch(apiUrl, {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching cards:', error)
    return null
  }
}

const fetchItemDetails = async (reference, index) => {
  const selectedLanguage = document.querySelector('#selectorIdioma')?.value || 'es-es'
  const itemUrl = `https://api.altered.gg/cards/${reference}?locale=${selectedLanguage}`
  
  try {
    const response = await fetch(itemUrl)
    if (!response.ok) {
      throw new Error(`Error en la solicitud del item ${reference}: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error(`Error fetching item ${reference}:`, error)
    return null
  }
}