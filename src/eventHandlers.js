const handleSearchButtonClick = () => {
  const inputElement = document.querySelector('#buscadorUnicas')
  if (inputElement && inputElement.value.trim() !== '') {
    fetchCardsDataWithLogic() // Ejecutar el flujo de llamadas
  } else {
  }
}
