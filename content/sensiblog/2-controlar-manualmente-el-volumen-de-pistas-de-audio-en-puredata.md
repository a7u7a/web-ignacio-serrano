---
date: February 7, 2023 7:00 PM
thumbnail: /uploads/readsf-ejemplo.png
category: Sonido
tags:
  - "#puredata"
title: "#2 Controlar manualmente el volumen de pistas de audio en PureData"
title_eng: Play and loop audio tracks on PureData
body_eng: Comming soon.
---
<div>

![](/uploads/imagen-vertical.png)

</div>

<div>

En este post te compartimos como controlar manuelmente la amplitud en la reproduccin de audios en PureData. Estos ejemplos son parte la base de los patches de PureData que usamos para Viento Fuerte y Cálido, comunicándonos con el protocolo Arduino-PureData y sketch capacitivo. Puedes encontrar también un post de Carolina, en el que te muestra pasos simples para refinar tus samples antes de pasar a PureData.

Una vez que logramos la versión final del sample para la obra, el paso siguiente correspondió a reproducir ese sample en loop en PD, añadiendo controles para manipular el volumen. 

# 1.

La manipulación de volumen/amplitud se realiza controlando el paso entre el objeto readsf\~ y la salida de audio. Una forma es como se muestra en la imagen. El signo “\*” indica que la señal que está pasando por el objeto será multiplicada. El símbolo “\~" indica que la señal es de audio. El número “1” indica que estamos multiplicando la señal por uno, es decir que no le estamos realizando ningún cambio.\**

</div>

<div>

![](/uploads/volumen-constante.png)

En la imagen vemos los siguientes elementos: un mensaje que indica abrir el archivo VientoFuerte.wav (ubicado en la misma carpeta que el patch), acompañado de un número “1” que envía un segundo mensaje de inicializar el objeto readsf. Luego está el objeto, en que hemos indicado con el número “2” que el audio saldrá en modo estéreo, y así sus salidas izquierda y central se conectan al objeto \[dac~] (Digital to Analog Converter, conexión entre PureData y la tarjeta de sonido). Por último, añadimos un bang que se activa cuando el audio termina de reproducirse.

</div>

<div>

# 2.

En el ejemplo anterior las amplitudes quedaron fijas. Esto es útil cuando no queremos manipular la dinámica del audio. Si queremos tener un control manual de este parámetro, tenemos dos opciones: (1) agregar un número, el que podemos variar en el modo reproducción haciendo click en el número y moviéndonos hacia arriba y hacia abajo, (2) agregando un slider que se opera de la misma manera.\*\*

![](/uploads/control-manual-volumen.png)