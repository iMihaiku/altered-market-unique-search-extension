// IMPLEMENTACION ACTUALIZADA
let loadFlag = false

const eventController = new MutationObserver(() => {
  console.log('Observando cambios en el DOM...')
	if (!validateUniqueURL() || loadFlag) {
		return
	}
  loadFlag = true
	injectSearchSectionIntoMarketForm()
})

eventController.observe(document.body, {
	childList: true,
	subtree: true
})

if (validateUniqueURL() && !loadFlag) {
  loadFlag = true
	injectSearchSectionIntoMarketForm()
}