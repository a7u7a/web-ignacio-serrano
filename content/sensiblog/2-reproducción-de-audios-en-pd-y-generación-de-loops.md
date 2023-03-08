---
date: February 13, 2023 1:18 PM
thumbnail: /uploads/1_01.gif
category: Sonido
tags:
  - "#puredata"
title: Reproducción de audios en PD y generación de loops
title_eng: Play and loop audio tracks on PureData
body_eng: Comming soon.
---
<div>

En la entrada [Edición básica de pistas de audio](https://www.ignacioserranol.com/sensiblog/edici%C3%B3n-de-una-pista-de-audio) vimos una manera simple de pre-procesar audios para añadirlas a nuestras obras. En este post mostraremos cómo abrir audios en PD y reproducirlos en loop. Esto lo aplicamos en la obra Viento Fuerte y Cálido. (Por [Caro](https://sites.google.com/view/caroespinoza))

# 1.

Para abrir archivos de audio usamos el objeto \[readsf~]. Este objeto tiene una entrada y dos salidas: la entrada es para la lectura de un mensaje en que indicaremos el nombre del archivo que queremos abrir, la salida de la izquierda corresponde a una salida de audio (si añadimos el número “2” al definir el objeto tendremos dos salidas de audio), y el outlet de la derecha corresponde a un bang que se activa cuando la pista de audio se acaba. El objeto se inicia cuando enviamos un “1” como mensaje y se detiene cuando enviamos un “0”.

# 2.

En la imagen vemos los siguientes elementos: un mensaje con la función \[open], que abre el archivo VientoFuerte.wav (ubicado en la misma carpeta que el patch), separado por una coma de un número “1”. Este último envía un segundo mensaje para inicializar el objeto \[readsf\~]. En él, hemos indicado con el número “2” que el audio saldrá en modo estéreo. Las salidas izquierda y central se conectan al objeto \[dac\~] (Digital to Analog Converter, conexión entre PureData y la tarjeta de sonido). Por último, añadimos un mensaje \[bang] que se activa cuando el audio termina de reproducirse.

</div>

<div>

![](/uploads/1_03.gif)

</div>

<div>

# 3.

Para la reproducción del audio debemos pasar del modo edición al reproducción (cmd+e) y hacer click en el mensaje que abre el archivo y activa el objeto \[readsf\~]. Para lograr una reproducción en loop el mensaje \[bang] se vuelve indispensable. Los bangs envían avisos o pulsos a cualquier objeto o mensaje que se conecte a su salida. Así, un bang conectado a un mensaje funcionará como un click. El truco para lograr un loop es conectar el bang que va de la salida del objeto  \[readsf\~] a la entrada del mensaje de iniciación. De esta forma, cada vez que el audio termine, el bang se activará y “hará click” nuevamente en el mensaje.

![](/uploads/1_02.gif)