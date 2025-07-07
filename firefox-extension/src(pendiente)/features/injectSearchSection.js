function injectSearchSectionIntoMarketForm(){
  console.log('Inyectando sección de búsqueda en el formulario del mercado...')
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
    const idiomas = env_config.languages

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
    buttonElement.id = 'buscadorUnicasBtn'

    // Crear un contenedor para el input y el selector de habilidades
    const inputContainer = document.createElement('div')
    inputContainer.className = 'flex w-4/5 gap-2'

    // Crear el selector de habilidades
    const skillSelectedElement = document.createElement('select')
    skillSelectedElement.id = 'selectorHabilidad'
    skillSelectedElement.className =
      'w-1/5 rounded-lg border-[1px] border-neutral-300 px-2 py-2 lg-medium focus:outline-none focus:border-gold-300 hover:bg-mercury-200 text-neutral-800 transition-all duration-quick ease-out bg-mercury-100'

    const skillsPerLanguage = env_config.skillsPerLanguage

    // Actualizar las opciones iniciales según el idioma seleccionado
    const initialLanguage =
      document.querySelector('#selectorIdioma')?.value || 'es-es'
    const skills =
      skillsPerLanguage[initialLanguage] || skillsPerLanguage['es-es']

    skills.forEach(skill => {
      const option = document.createElement('option')
      option.value = skill.value
      option.textContent = skill.label
      skillSelectedElement.appendChild(option)
    })

    // Escuchar cambios en el selector de idioma

    // Insertar el selector y el botón en el contenedor
    actionContainer.appendChild(selectElement)
    actionContainer.appendChild(buttonElement)

    // Insertar el contenedor de acción en el formulario
    form.insertBefore(actionContainer, form.firstChild)

    // Insertar el selector de habilidades y el input en el contenedor
    inputContainer.appendChild(skillSelectedElement)
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
        const skills =
          skillsPerLanguage[selectedLanguage] ||
          skillsPerLanguage['es-es']

        // Limpiar las opciones actuales
        skillSelectedElement.innerHTML = ''

        // Agregar las nuevas opciones según el idioma
        skills.forEach(skill => {
          const option = document.createElement('option')
          option.value = skill.value
          option.textContent = skill.label
          skillSelectedElement.appendChild(option)
        })
      })
  }
}