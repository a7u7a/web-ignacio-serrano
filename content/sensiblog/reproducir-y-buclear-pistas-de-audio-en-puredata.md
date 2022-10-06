---
date: October 6, 2022 3:55 PM
thumbnail: /uploads/readsf-ejemplo.png
category: Sonido
tags:
  - PureData
  - sonido
title: Reproducir y buclear pistas de audio en PureData
title_eng: Play and loop audio tracks on PureData
body_eng: Comming soon.
---
<div>

![](/uploads/imagen-vertical.png)

</div>

<div>

En este post te compartimos como reproducir y buclear audios en PureData. Estos ejemplos son parte la base de los patches de PureData que usamos para Viento Fuerte y Cálido, comunicándonos con el protocolo Arduino-PureData y sketch capacitivo. Puedes encontrar también un post de Carolina, en el que te muestra pasos simples para refinar tus samples antes de pasar a PureData.

Una vez que logramos la versión final del sample para la obra, el paso siguiente correspondió a reproducir ese sample en loop en PD, añadiendo en principio algún control que permitiera manipular el volumen. 

# 1.

Para abrir archivos de audio usamos el objeto \[readsf~]. Este objeto tiene una entrada y dos salidas: la entrada es para la lectura de un mensaje en que indicaremos el nombre del archivo que queremos abrir, la salida de la izquierda corresponde a una salida de audio (si añadimos el número “2” al definir el objeto tendremos dos salidas de audio), y el outlet de la derecha corresponde a un bang que se activa cuando la pista de audio se acaba. El objeto se inicia cuando enviamos un “1” como mensaje y se detiene cuando enviamos un “0”.

En la imagen vemos los siguientes elementos: un mensaje que indica abrir el archivo VientoFuerte.wav (ubicado en la misma carpeta que el patch), acompañado de un número “1” que envía un segundo mensaje de inicializar el objeto readsf. Luego está el objeto, en

</div>

<div>

 que hemos indicado con el número “2” que el audio saldrá en modo estéreo, y así sus salidas izquierda y central se conectan al objeto \[dac~] (Digital to Analog Converter, conexión entre PureData y la tarjeta de sonido). Por último, añadimos un bang que se activa cuando el audio termina de reproducirse.

![](/uploads/readsf-ejemplo.png)

</div>

<div>

# 2.

Para la reproducción del audio debemos pasar del modo edición al reproducción (cmd+e) y hacer click en el mensaje. Para lograr una reproducción en loop el objeto bang se vuelve indispensable. Los bangs envían avisos o pulsos a cualquier objeto o mensaje que se conecte a su salida. Así, un bang conectado a un mensaje funcionará como un click. El truco para lograr un loop es conectar el bang que va de la salida del objeto readsf a la entrada del mensaje. De esta forma, cada vez que el audio termine, el bang se activará y “hará click” nuevamente en el mensaje.\*\*

![](/uploads/loop-ejemplo.png)