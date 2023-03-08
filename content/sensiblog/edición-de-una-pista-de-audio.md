---
date: January 2, 2023 6:42 PM
thumbnail: /uploads/garage2.gif
category: Sonido
tags:
  - sonido
  - audio
title: Edición básica de una pista de audio
title_eng: Sound track edition
body_eng: |
  Soon.
---
<div>

Es muy probable que cuando trabajemos con grabaciones propias o samples debamos realizar algún tipo de edición que ajuste ese audio a las necesidades de la obra. Esto quiere decir: cambiar la dinámica, añadir efectos, hacer fade in y fade out para evitar clicks, etc. En este post mostramos una forma básica de edición de pistas de audio que aplicamos en la obra Viento Fuerte, Cálido y Ondita Sensible I  para evitar saltos en la reproducción sonora.

# 1.

El objetivo de la obra Viento Fuerte fue lograr un sonido orgánico de viento, con una dinámica controlada externamente. Para generar la identidad sonora, descargamos un sample de sonido de viento desde la base de datos colaborativa Freesound (<https://freesound.org/>). Al reproducir en loop este extracto desde PD, se escuchaba un click cada vez que iniciaba el bucle.

# 2.

Para evitar el click, fue necesario editar la dinámica el sample añadiendo un fade in y un fade out. Si bien es posible hacer modificaciones a pistas desde PD, la opción más simple es utilizar algún software de audio. En nuestro caso usamos GarageBand 10.3.4, programa gratuito para OS X, pero existen otras alternativas gratuitas como Audacity.

</div>

<div>

![](/uploads/garage.gif)

</div>

<div>

# 3.

Para hacer los cambios de dinámica automatizamos la pista siguiendo los siguientes pasos: Mezcla/Mix -> Mostrar Automatización/Show Automation ->Volume, como muestra la imagen.

# 4.

Escogido el parámetros a automatizar, aparecerá una línea de control sobre la pista de audio. Haciendo click en ella, se crearán puntos que permitirán manipular los valores en este caso de audio.

# 5.

Como se ve en la imagen, al ir a “mostrar automatización” aparece una lista de automatizaciones posibles, entre ellas Reverb, Echo. La forma de operar con ellas es exactamente la misma. 

</div>