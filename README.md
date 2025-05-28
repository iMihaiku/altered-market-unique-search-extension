# Unique Search for Altered.gg - Chrome Extension

Esta extensión de Chrome mejora la experiencia de navegación en [Altered.gg](https://www.altered.gg/) proporcionando capacidades avanzadas de búsqueda para cartas únicas en el marketplace. Se integra de manera transparente con la API del sitio web para ofrecer funciones potentes de filtrado, resaltado y traducción automática.

## Funcionalidades

### 🔍 Búsqueda Avanzada
- **Búsqueda de texto**: Busca por nombre o habilidades de cartas
- **Filtrado por habilidades**: Filtra por tipos específicos de habilidades ({j}, {h}, {r}, "al anochecer", "cuando", etc.)
- **Resaltado visual**: Las cartas que coinciden con la búsqueda se resaltan con borde dorado y fondo amarillo claro
- **Búsqueda en tiempo real**: Resultados inmediatos al hacer clic en "Buscar"

### 🌍 Soporte Multi-idioma
- **Tres idiomas soportados**: Español, Inglés y Francés
- **Traducción automática opcional**: Cambia automáticamente el idioma de las cartas tras la búsqueda
- **Filtros contextuales**: Los filtros de habilidades se adaptan al idioma seleccionado
- **API multiidioma**: Utiliza los endpoints de la API de Altered.gg para cada idioma

### 🎯 Integración Inteligente
- **Detección automática de página**: Solo se activa en páginas `/market` con parámetro `UNIQUE`
- **Observador de mutaciones**: Se adapta dinámicamente a cambios de URL sin recargar la página
- **Almacenamiento global**: Mantiene todos los datos de cartas fetched en memoria para uso posterior
- **Reemplazo de imágenes**: Cambia automáticamente las imágenes de las cartas en modales según el idioma

### ⚙️ Configuración Personalizable
- **Popup inteligente**: Muestra diferentes opciones según la página actual
- **Persistencia de configuración**: Guarda preferencias usando chrome.storage
- **Traducción automática opcional**: Puede activarse/desactivarse desde el popup
- **Mensajes elegantes**: Reemplaza alerts con mensajes HTML estilizados

### 🎨 Interfaz de Usuario
- **Diseño responsivo**: Se integra perfectamente con el diseño de Altered.gg
- **Controles intuitivos**: Input de búsqueda, selector de idioma, selector de habilidades y botón de búsqueda
- **Advertencias de uso**: Informa sobre el uso responsable de la API
- **Feedback visual**: Mensajes de éxito/error con auto-ocultado

## Estructura del Proyecto

```
chrome-extension
├── src
│   ├── api.js              # Integración con API de Altered.gg y lógica de búsqueda
│   ├── content.js          # Script de contenido para manipulación DOM y observadores
│   ├── htmlInyector.js     # Inyección de interfaz de búsqueda en páginas
│   └── popup
│       ├── popup.html      # Estructura HTML del popup de configuración
│       ├── popup.js        # Lógica del popup y manejo de configuración
│       └── popup.css       # Estilos para el popup y mensajes
├── manifest.json           # Configuración de la extensión con permisos
└── README.md              # Documentación del proyecto
```

## Instalación

1. Clona el repositorio en tu máquina local
2. Abre Chrome y navega a `chrome://extensions/`
3. Activa el "Modo de desarrollador" en la esquina superior derecha
4. Haz clic en "Cargar extensión sin empaquetar" y selecciona el directorio `chrome-extension`

## Uso

### Búsqueda Básica
1. Navega a [Altered.gg Market](https://www.altered.gg/cards/market) con filtro de cartas únicas
2. Verás automáticamente la interfaz de búsqueda inyectada en la parte superior
3. Selecciona tu idioma preferido (Español, Inglés o Francés)
4. Opcionalmente, selecciona un filtro de habilidad específica
5. Escribe tu término de búsqueda y haz clic en "Buscar"
6. Las cartas que coincidan se resaltarán automáticamente

### Configuración
1. Haz clic en el icono de la extensión en la barra de herramientas de Chrome
2. Si estás en una página de market, verás las opciones de configuración
3. Activa/desactiva la traducción automática de cartas
4. Haz clic en "Guardar configuración" para persistir tus preferencias

### Características Avanzadas
- **Búsqueda por habilidades**: Selecciona tipos específicos de habilidades para filtrar resultados
- **Traducción automática**: Las cartas cambiarán de idioma automáticamente si está habilitado
- **Imágenes multiidioma**: Las imágenes en modales se adaptan al idioma seleccionado
- **Búsqueda normalizada**: Ignora acentos y diferencias de mayúsculas/minúsculas

## Tecnologías Utilizadas

- **Chrome Extensions API**: Para la funcionalidad básica de extensión
- **chrome.storage API**: Para persistencia de configuración
- **MutationObserver**: Para detección dinámica de cambios en el DOM
- **Fetch API**: Para comunicación con la API de Altered.gg
- **CSS Moderno**: Para integración visual seamless

## Notas Importantes

- **Uso responsable de API**: La extensión incluye advertencias sobre el uso responsable de la API de Altered.gg
- **Dependencias externas**: Requiere acceso a la API de Altered.gg para funcionar correctamente
- **Contexto específico**: Solo funciona en páginas de market con cartas únicas
- **Almacenamiento local**: Utiliza chrome.storage para guardar preferencias del usuario

## Permisos Requeridos

- `activeTab`: Para interactuar con la pestaña activa
- `storage`: Para guardar configuraciones del usuario
- `https://www.altered.gg/*`: Para inyectar scripts en el sitio web
- `https://api.altered.gg/*`: Para realizar llamadas a la API

## Contribución

¡Siéntete libre de enviar issues o pull requests si tienes sugerencias o mejoras para la extensión!

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.