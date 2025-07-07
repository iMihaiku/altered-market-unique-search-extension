const env_config = {

  "classIdentifiers":{
    "cardInfoDiv":
		  '.fixed.top-0.left-0.right-0.bottom-0.z-50.flex.items-center.justify-center.bg-black\\/80',
    "modalCardOpener":
      ".bg-sand-200.flex.rounded-sm.md\\:flex-row.flex-col.w-full.col-span-12"
  },
  "api_config": {
    sessionUrl: 'https://www.altered.gg/api/auth/session',
    cardsUrl: 'https://api.altered.gg/cards',
    defaultLanguage: 'es-es'
  },
  "languages": [
      { value: 'es-es', label: 'Español' },
      { value: 'en-us', label: 'Inglés' },
      { value: 'fr-fr', label: 'Francés' }
    ],
  "skillsPerLanguage":{
    "es-es": [
        { value: 'todo', label: 'Todo' },
        { value: '{j}', label: 'Flecha' },
        { value: '{h}', label: 'Mano' },
        { value: '{r}', label: 'Reserva' },
        { value: 'al anochecer', label: 'Al Anochecer' },
        { value: 'al mediodia', label: 'Al Mediodía' },
        { value: 'cuando', label: 'Cuando' }
      ],
    "en-us": [
        { value: 'todo', label: 'All' },
        { value: '{j}', label: 'Arrow' },
        { value: '{h}', label: 'Hand' },
        { value: '{r}', label: 'Reserve' },
        { value: 'at dusk', label: 'At Dusk' },
        { value: 'at noon', label: 'At Noon' },
        { value: 'when', label: 'When' }
      ],
    "fr-fr": [
        { value: 'todo', label: 'Tout' },
        { value: '{j}', label: 'Flèche' },
        { value: '{h}', label: 'Main' },
        { value: '{r}', label: 'Réserve' },
        { value: 'au crepuscule', label: 'Au Crépuscule' },
        { value: 'a midi', label: 'À Midi' },
        { value: 'quand', label: 'Quand' }
      ]
  }
}
const CHROME_STORAGE = {
  autoChangeLanguageKey: 'autoChangeLanguage',
}

const POPUP_CONFIG = {
  messageTimeout: 3000,
  marketUrl: 'https://www.altered.gg/cards/market',
} 

const SETTINGS_CONFIG = {
  autoChangeLanguage: {
    id: 'autoChangeLanguage',
    label: 'Cambiar idioma de las cartas tras la búsqueda',
    type: 'checkbox',
    storageKey: CHROME_STORAGE.autoChangeLanguageKey
  }
  // Aquí se pueden agregar más ajustes fácilmente
}