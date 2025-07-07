let allFetchedCards = []

const fetchCardsDataWithLogic = async () => {
  clearHighlightedCards()
  allFetchedCards = []

  const accessToken = await fetchAccessToken()
  if (!accessToken) return

  const currentUrl = new URL(window.location.href)
  const params = new URLSearchParams(currentUrl.search)

  const data = await fetchCardsData(params, accessToken)
  if (!data?.['hydra:member'] || !Array.isArray(data['hydra:member'])) {
    console.log('No se encontraron cartas')
    return
  }

  const promises = data['hydra:member'].map((item, index) => {
    if (item.reference) {
      return processCardItem(item, index)
    }
    return Promise.resolve()
  })

  try {
    await Promise.all(promises)
    console.log(`Procesadas ${data['hydra:member'].length} cartas en paralelo`)
  } catch (error) {
    console.error('Error procesando cartas:', error)
  }
}

const processCardItem = async (item, index) => {
  const itemData = await fetchItemDetails(item.reference)
  if (!itemData) return
  
  allFetchedCards.push(itemData)
  
  await updateCardTitle(itemData, index)
  
  await processCardSearch(itemData, index)
}