const injectSearchIntoForm = eventHandler => {
  const form = document.querySelector('form')
  if (form) {
    // Crear el input
    const inputElement = document.createElement('input')
    inputElement.id = 'buscadorUnicas'
    inputElement.className =
      'w-full autofill:bg-neutral-100 outline-none appearance-none rounded-lg border-[1px] border-transparent px-2 sm:px-3 py-2 lg-medium focus:outline-none focus:border-gold-300 hover:bg-mercury-200 text-neutral-800 placeholder:text-neutral-300 transition-all duration-quick ease-out focus:border-neutral-50 bg-mercury-100 Input_input__7cGIv'
    inputElement.placeholder = 'Escribe aquí...'

    // Crear un contenedor para el selector y el botón
    const actionContainer = document.createElement('div')
    actionContainer.className = 'flex w-full gap-2'

    // Crear el selector de idioma
    const selectElement = document.createElement('select')
    selectElement.id = 'selectorIdioma'
    selectElement.className =
      'w-1/2 rounded-lg border-[1px] border-neutral-300 px-2 py-2 lg-medium focus:outline-none focus:border-gold-300 hover:bg-mercury-200 text-neutral-800 transition-all duration-quick ease-out bg-mercury-100'

    // Opciones de idioma
    const idiomas = [
      { value: 'es-es', label: 'Español' },
      { value: 'en-us', label: 'Inglés' },
      { value: 'fr-fr', label: 'Francés' }
    ]

    idiomas.forEach(idioma => {
      const option = document.createElement('option')
      option.value = idioma.value
      option.textContent = idioma.label
      selectElement.appendChild(option)
    })

    // Crear el botón
    const buttonElement = document.createElement('button')
    buttonElement.className =
      'w-1/2 bg-neutral-500 hover:bg-neutral-700 focus:bg-neutral-600 transition clickable text-neutral-50 sm-regular px-3 py-1.5 rounded-lg'
    buttonElement.textContent = 'Buscar'

    // Agregar evento de clic al botón
    buttonElement.addEventListener('click', event => {
      event.preventDefault() // Evitar el comportamiento por defecto del formulario
      eventHandler()
    })

    // Crear un contenedor para el input y el selector de habilidades
    const inputContainer = document.createElement('div')
    inputContainer.className = 'flex w-4/5 gap-2'

    // Crear el selector de habilidades
    const abilitySelectElement = document.createElement('select')
    abilitySelectElement.id = 'selectorHabilidad'
    abilitySelectElement.className =
      'w-1/5 rounded-lg border-[1px] border-neutral-300 px-2 py-2 lg-medium focus:outline-none focus:border-gold-300 hover:bg-mercury-200 text-neutral-800 transition-all duration-quick ease-out bg-mercury-100'

    const habilidadesPorIdioma = {
      'es-es': [
        { value: 'todo', label: 'Todo' },
        { value: '{j}', label: 'Flecha' },
        { value: '{h}', label: 'Mano' },
        { value: '{r}', label: 'Reserva' },
        { value: 'al anochecer', label: 'Al Anochecer' },
        { value: 'al mediodia', label: 'Al Mediodía' },
        { value: 'cuando', label: 'Cuando' }
      ],
      'en-us': [
        { value: 'todo', label: 'All' },
        { value: '{j}', label: 'Arrow' },
        { value: '{h}', label: 'Hand' },
        { value: '{r}', label: 'Reserve' },
        { value: 'at dusk', label: 'At Dusk' },
        { value: 'at noon', label: 'At Noon' },
        { value: 'when', label: 'When' }
      ],
      'fr-fr': [
        { value: 'todo', label: 'Tout' },
        { value: '{j}', label: 'Flèche' },
        { value: '{h}', label: 'Main' },
        { value: '{r}', label: 'Réserve' },
        { value: 'au crepuscule', label: 'Au Crépuscule' },
        { value: 'a midi', label: 'À Midi' },
        { value: 'quand', label: 'Quand' }
      ]
    }

    // Actualizar las opciones iniciales según el idioma seleccionado
    const initialLanguage =
      document.querySelector('#selectorIdioma')?.value || 'es-es'
    const habilidades =
      habilidadesPorIdioma[initialLanguage] || habilidadesPorIdioma['es-es']

    habilidades.forEach(habilidad => {
      const option = document.createElement('option')
      option.value = habilidad.value
      option.textContent = habilidad.label
      abilitySelectElement.appendChild(option)
    })

    // Escuchar cambios en el selector de idioma

    // Insertar el selector y el botón en el contenedor
    actionContainer.appendChild(selectElement)
    actionContainer.appendChild(buttonElement)

    // Insertar el contenedor de acción en el formulario
    form.insertBefore(actionContainer, form.firstChild)

    // Insertar el selector de habilidades y el input en el contenedor
    inputContainer.appendChild(abilitySelectElement)
    inputContainer.appendChild(inputElement)

    // Insertar el inputContainer en el formulario
    form.insertBefore(inputContainer, form.firstChild)

    // Crear una advertencia sobre el uso del buscador
    const warningElement = document.createElement('p')
    warningElement.className = 'text-sm text-neutral-600 mt-2'
    warningElement.textContent =
      'Nota: Este buscador es parte de una extensión y hace uso de la API de Altered. Por favor, úselo de manera responsable.'

    // Insertar la advertencia en el formulario, debajo del inputContainer
    form.insertBefore(warningElement, form.firstChild)

    document
      .querySelector('#selectorIdioma')
      .addEventListener('change', event => {
        const selectedLanguage = event.target.value
        const habilidades =
          habilidadesPorIdioma[selectedLanguage] ||
          habilidadesPorIdioma['es-es']

        // Limpiar las opciones actuales
        abilitySelectElement.innerHTML = ''

        // Agregar las nuevas opciones según el idioma
        habilidades.forEach(habilidad => {
          const option = document.createElement('option')
          option.value = habilidad.value
          option.textContent = habilidad.label
          abilitySelectElement.appendChild(option)
        })
      })
  }
}
