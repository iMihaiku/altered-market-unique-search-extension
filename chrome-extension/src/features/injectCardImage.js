async function injectImageIntoCardInfoDiv() {
  const { autoChangeLanguage } = await chrome.storage.sync.get([
			CHROME_STORAGE.autoChangeLanguageKey
		])
	if (!autoChangeLanguage) return
  
	const cardInfoDiv = getOpenCardModal()
	if (!cardInfoDiv) return

	const cardImage = cardInfoDiv.querySelector('img')
	if (!cardImage?.src) return

	const cardData = findCardData(cardImage.src)
	if (!cardData) return

	handleImageLanguageChange(cardImage, cardData)
}

function getOpenCardModal() {
	const cardInfoDiv = document.querySelector(env_config.classIdentifiers.cardInfoDiv)
	return cardInfoDiv?.getAttribute('data-state') === 'open' ? cardInfoDiv : null
}

function findCardData(imageSrc) {
	const currentCardName = imageSrc.split('/').pop()
	return allFetchedCards.find((card) => {
		const savedCardName = card.allImagePath['en-us'].split('/').pop()
		return currentCardName === savedCardName
	})
}

async function handleImageLanguageChange(cardImage, cardData) {
	try {
		const language = document.querySelector('#selectorIdioma')?.value || 'es-es'
		const newImageSrc = cardData.allImagePath[language]

		if (newImageSrc) {
			const originalSrc = cardImage.src
			cardImage.src = newImageSrc
			cardImage.srcset = newImageSrc

			cardImage.onerror = () => {
				cardImage.src = originalSrc
				cardImage.srcset = originalSrc
			}
		}
	} catch (error) {
		console.error('Error changing card language:', error)
	}
}
