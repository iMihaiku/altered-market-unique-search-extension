document.addEventListener('DOMContentLoaded', function () {
  const container = document.querySelector('.container')

  // Verificar la URL actual
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const currentTab = tabs[0]
    // Temporaly Disabled until future implementation
    if (
      currentTab &&
      currentTab.url?.includes('/cards/market') &&
      currentTab.url?.includes('altered.gg')
    ) {
      console.log('Market page detected:', currentTab.url)
      // Mostrar menú de configuración
      container.innerHTML = `
        <h1>Configuración</h1>
        <div id="message" class="message hidden"></div>
        <label>
          <input type="checkbox" id="autoChangeLanguage" /> Cambiar idioma de las cartas tras la busqueda
        </label>
        <button id="saveConfig" class="button">Guardar configuración</button>
      `

      // Leer configuración guardada y actualizar el checkbox
      chrome.storage.sync.get(['autoChangeLanguage'], result => {
        document.getElementById('autoChangeLanguage').checked =
          !!result.autoChangeLanguage
      })

      // Agregar funcionalidad al botón de guardar
      const saveButton = document.getElementById('saveConfig')
      const messageDiv = document.getElementById('message')

      saveButton.addEventListener('click', () => {
        const autoChangeLanguage =
          document.getElementById('autoChangeLanguage').checked

        chrome.storage.sync.set({ autoChangeLanguage }, () => {
          // Mostrar mensaje de éxito
          messageDiv.textContent = '✓ Configuración guardada correctamente'
          messageDiv.className = 'message success'

          // Ocultar el mensaje después de 3 segundos
          setTimeout(() => {
            messageDiv.className = 'message hidden'
          }, 3000)
        })
      })
    } else {
      // Mostrar mensaje informativo
      container.innerHTML = `
        <h1>Información</h1>
        <p>Por favor, dirígete a la sección de Market en altered.gg para usar esta extensión.</p>
        <a href="https://www.altered.gg/cards/market" target="_blank" class="button">Ir al Market</a>
      `
    }
  })
})
