# Bot de Telegram para Seguimiento de Envíos Internacionales

## Descripción

Este es un bot de Telegram programado en JavaScript que utiliza Puppeteer para realizar el scraping de una página web de seguimiento de envíos internacionales. El bot está diseñado para detectar automáticamente cualquier movimiento en el estado del envío y notificar a los usuarios en tiempo real.

## Características principales:

- **Personalización:** El bot puede ser fácilmente personalizado para adaptarse a diferentes necesidades. Se debe configurar el `bot_id`, `chat_id`, `tracking_number` y los datos a scrapear en la web según las preferencias deseadas.

- **Notificaciones en Tiempo Real:** Cuando se detecta algún movimiento en el estado del envío, el bot envía una notificación instantánea a los usuarios.

## Ejemplo de Funcionamiento

El funcionamineto del bot es muy sencillo, lo que hace es consultar periódicamente (cada 1:30hs) la página web de seguimiento de envíos internacionales 'China Post' (https://chinapost-track.com/track-trace). Si detecta algún cambio con respecto al ultimo estado del envío registrado, envía una notificación vía Telegram al usuario.

![Mockup 1](img/mockup1.jpg)

*Imagen 1: Ejemplo de notificación de movimiento en el estado del envío*

![Mockup 2](img/mockup2.jpg)

*Imagen 2: Vista previa del bot en funcionamiento en la interfaz de Telegram*
