const highlightCardInDOMByIndex = index => {
  const parentContainer = document.querySelector('.grid-12.gap-4.items-end')
  if (!parentContainer) return

  const cardElements = parentContainer.children
  if (!cardElements[index]) return

  const cardElement = cardElements[index]
  cardElement.style.border = '2px solid gold'
  cardElement.style.backgroundColor = '#fff8dc'
}

const clearHighlightedCards = () => {
  const parentContainer = document.querySelector('.grid-12.gap-4.items-end')
  if (!parentContainer) return

  const cardElements = parentContainer.children
  Array.from(cardElements).forEach(cardElement => {
    cardElement.style.border = ''
    cardElement.style.backgroundColor = ''
    cardElement.className = 'bg-sand-200 flex rounded-sm md:flex-row flex-col w-full col-span-12'
  })
}