function validateUniqueURL() {
	const url = window.location.href
	const isValid = url.includes('/market') && url.includes('UNIQUE')
	if (!isValid) {
		loadFlag = false
	}
	return isValid
}
