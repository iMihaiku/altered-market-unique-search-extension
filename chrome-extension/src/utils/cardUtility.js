// Utilidades para cartas
const normalizeString = str => {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
}

const updateCardTitle = async (itemData, index) => {
  const parentContainer = document.querySelector('.grid-12.gap-4.items-end')
  if (!parentContainer) return

  const cardElements = parentContainer.children
  if (!cardElements[index]) return

  const cardTitle = cardElements[index].querySelector(
    'p.sm-bold.text-shadow-lg.shadow-black.leading-\\[14px\\].text-left'
  )
  if (!cardTitle) return

  try {
    const { autoChangeLanguage } = await chrome.storage.sync.get(['autoChangeLanguage'])
    if (autoChangeLanguage) {
      cardTitle.textContent = itemData.name
    }
  } catch (error) {
    console.error('Error updating card title:', error)
  }
}

const processCardSearch = async (itemData, index) => {
  const specificString = normalizeString(
    document.querySelector('#buscadorUnicas')?.value || ''
  )
  
  if (!specificString) return

  const selectedAbility = document.querySelector('#selectorHabilidad')?.value || 'todo'
  const abilities = itemData.elements?.MAIN_EFFECT?.split('.  ') || []
  
  const matches = abilities.some(ability => {
    const normalizedAbility = normalizeString(ability)
    return (
      normalizedAbility.includes(specificString) &&
      (selectedAbility === 'todo' || normalizedAbility.includes(selectedAbility))
    )
  })

  if (matches) {
    highlightCardInDOMByIndex(index)
  }
}