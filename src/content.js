let lastHref = window.location.href

const observer = new MutationObserver(() => {
  if (lastHref !== window.location.href) {
    lastHref = window.location.href
    if (window.location.href.includes('/market')) {
      if (window.location.href.includes('UNIQUE')) {
        injectSearchIntoForm(handleSearchButtonClick)
      } else {
      }
    }
  }
})

observer.observe(document.body, {
  childList: true,
  subtree: true
})

if (
  window.location.href.includes('/market') &&
  window.location.href.includes('UNIQUE')
) {
  injectSearchIntoForm(handleSearchButtonClick)
}

const cardInfoObserver = new MutationObserver(() => {
  const cardInfoDiv = document.querySelector(
    '.fixed.top-0.left-0.right-0.bottom-0.z-50.flex.items-center.justify-center.bg-black\\/80'
  ) // Selector actualizado con la clase proporcionada
  if (cardInfoDiv && cardInfoDiv.getAttribute('data-state') === 'open') {
    // Buscar la imagen dentro del div
    const cardImage = cardInfoDiv.querySelector('img') // Cambiar por el selector real de la imagen
    if (cardImage && cardImage.src) {
      // Buscar la carta en el array global usando la última posición del identificador
      const cardFirstImageSrc = cardImage.src
      const cardData = allFetchedCards.find(card => {
        const cartaActual = cardImage.src.split('/').pop()
        const cartaGuardada = card.allImagePath['en-us'].split('/').pop()
        return cartaActual === cartaGuardada
      })
      if (cardData !== undefined) {
        // Verificar la configuración de cambio automático de idioma
        chrome.storage.sync.get(['autoChangeLanguage'], result => {
          const autoChangeLanguage = result.autoChangeLanguage || false

          if (autoChangeLanguage) {
            // Solo cambiar si la configuración está activada
            const language =
              document.querySelector('#selectorIdioma')?.value || 'es-es'
            cardImage.srcset = cardData.allImagePath[language]
            cardImage.src = cardData.allImagePath[language]

            // Verificar si la imagen no se carga correctamente
            cardImage.onerror = () => {
              cardImage.src = cardFirstImageSrc // URL alternativa
              cardImage.srcset = cardFirstImageSrc // URL alternativa
            }
          }
          // Si autoChangeLanguage está desactivado, no hacemos nada (se mantiene la imagen original)
        })
      }
    }
  }
})

cardInfoObserver.observe(document.body, {
  childList: true,
  subtree: true
})
