// Función para obtener el accessToken desde la API de sesión
const fetchAccessToken = async () => {
  const sessionUrl = 'https://www.altered.gg/api/auth/session'
  try {
    const response = await fetch(sessionUrl)
    if (!response.ok) {
      throw new Error(`Error en la solicitud de sesión: ${response.status}`)
    }
    const sessionData = await response.json()
    const accessToken = sessionData?.accessToken
    if (accessToken) {
      return accessToken
    } else {
      return null
    }
  } catch (error) {
    return null
  }
}

const normalizeString = str => {
  const strNormaliced = str
    .toLowerCase() // Convertir a minúsculas
    .normalize('NFD') // Normalizar para separar caracteres diacríticos
    .replace(/\p{Diacritic}/gu, '') // Eliminar diacríticos (acentos)
  return strNormaliced
}

// Función para obtener información completa de cada item
const fetchItemDetails = async (reference, index) => {
  const selectedLanguage =
    document.querySelector('#selectorIdioma')?.value || 'es-es'

  const itemUrl = `https://api.altered.gg/cards/${reference}?locale=${selectedLanguage}`
  try {
    const response = await fetch(itemUrl)
    if (!response.ok) {
      throw new Error(
        `Error en la solicitud del item ${reference}: ${response.status}`
      )
    }
    const itemData = await response.json()
    allFetchedCards.push(itemData)

    const parentContainer = document.querySelector('.grid-12.gap-4.items-end') // Seleccionar el contenedor padre
    if (parentContainer) {
      const cardElements = parentContainer.children // Obtener los hijos del contenedor
      if (cardElements[index]) {
        const cardTitle = cardElements[index].querySelector(
          'p.sm-bold.text-shadow-lg.shadow-black.leading-\\[14px\\].text-left'
        )
        if (cardTitle) {
          // Verificar la configuración de cambio automático de idioma
          chrome.storage.sync.get(['autoChangeLanguage'], result => {
            const autoChangeLanguage = result.autoChangeLanguage || false

            if (autoChangeLanguage) {
              // Solo cambiar el título si la configuración está activada
              cardTitle.textContent = itemData.name
            }
            // Si autoChangeLanguage está desactivado, no cambiamos el título
          })
        }
      }
    }

    // Buscar un string específico en un apartado del item
    const specificString = normalizeString(
      document.querySelector('#buscadorUnicas').value
    )

    const selectedAbility = document.querySelector('#selectorHabilidad').value
    // Dividir las habilidades de la carta por '.  '
    const abilities = itemData.elements.MAIN_EFFECT.split('.  ')
    const matches = abilities.some(ability => {
      const normalizedAbility = normalizeString(ability)
      return (
        normalizedAbility.includes(specificString) &&
        (selectedAbility === 'todo' ||
          normalizedAbility.includes(selectedAbility))
      )
    })

    if (matches) {
      highlightCardInDOMByIndex(index)
    }
  } catch (error) {}
}

const highlightCardInDOMByIndex = index => {
  const parentContainer = document.querySelector('.grid-12.gap-4.items-end') // Seleccionar el contenedor padre
  if (parentContainer) {
    const cardElements = parentContainer.children // Obtener los hijos del contenedor
    if (cardElements[index]) {
      const cardElement = cardElements[index]
      cardElement.style.border = '2px solid gold'
      cardElement.style.backgroundColor = '#fff8dc' // Color amarillo claro
    }
  }
}

const clearHighlightedCards = () => {
  const parentContainer = document.querySelector('.grid-12.gap-4.items-end') // Seleccionar el contenedor padre
  if (parentContainer) {
    const cardElements = parentContainer.children // Obtener los hijos del contenedor
    Array.from(cardElements).forEach(cardElement => {
      cardElement.style.border = ''
      cardElement.style.backgroundColor = ''
      cardElement.className =
        'bg-sand-200 flex rounded-sm md:flex-row flex-col w-full col-span-12' // Restablecer las clases predeterminadas
    })
  }
}

// Función para obtener la lista de cartas
const fetchCardsData = async (params, accessToken) => {
  const selectedLanguage =
    document.querySelector('#selectorIdioma')?.value || 'es-es'
  params.set('locale', selectedLanguage) // Usar el idioma seleccionado
  const apiUrl = `https://api.altered.gg/cards?${params.toString()}`
  try {
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`)
    }
    const data = await response.json()
    return data
  } catch (error) {
    return null
  }
}

let allFetchedCards = [] // Array global para almacenar todas las cartas obtenidas

const fetchCardsDataWithLogic = async () => {
  clearHighlightedCards() // Limpiar las cartas resaltadas antes de buscar nuevas

  const accessToken = await fetchAccessToken()
  if (!accessToken) {
    return
  }

  const currentUrl = new URL(window.location.href)
  const params = new URLSearchParams(currentUrl.search) // Usar los parámetros actuales de la URL

  // Obtener el idioma seleccionado del selector
  const selectedLanguage =
    document.querySelector('#selectorIdioma')?.value || 'es-es'
  params.set('locale', selectedLanguage) // Usar el idioma seleccionado

  const data = await fetchCardsData(params, accessToken)
  if (data && data['hydra:member'] && Array.isArray(data['hydra:member'])) {
    // Almacenar todas las cartas obtenidas en el array global

    data['hydra:member'].forEach(async (item, index) => {
      if (item.reference) {
        const itemData = await fetchItemDetails(item.reference, index)
        if (itemData) {
          // Aquí puedes agregar lógica para procesar los datos del item
        }
      }
    })
  }
}
