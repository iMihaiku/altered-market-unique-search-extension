const handleSearchButtonClick = async (event) => {
  event.preventDefault()
  const inputElement = document.querySelector('#buscadorUnicas')
  if (inputElement && inputElement.value.trim() !== '') {
    await fetchCardsDataWithLogic()
    injectImageIntoCardInfoDiv()
  }
}

const handleChangeLanguage = (event) => {
  const selectedLanguage = event.target.value
  changeCardImageLanguage(selectedLanguage)
}

const handleChangeSkill = (event) => {
  const selectedSkill = event.target.value
  changeCardImageSkill(selectedSkill)
}