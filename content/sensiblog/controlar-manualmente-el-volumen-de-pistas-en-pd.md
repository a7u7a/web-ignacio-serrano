---
date: February 13, 2023 1:29 PM
thumbnail: /uploads/1_01.gif
category: Sonido
tags:
  - "#puredata"
title: Controlar manualmente el volumen de pistas en PD
title_eng: "#2 Play and loop audio tracks on PureData"
body_eng: Comming soon.
---
<div>



# 1.



# 2.



</div>

<div>

![](/uploads/1_01.gif)

</div>

<div>

# 3.

Para la reproducción del audio debemos pasar del modo edición al reproducción (cmd+e) y hacer click en el mensaje que abre el archivo y activa el objeto \[readsf\~]. Para lograr una reproducción en loop el mensaje \[bang] se vuelve indispensable. Los bangs envían avisos o pulsos a cualquier objeto o mensaje que se conecte a su salida. Así, un bang conectado a un mensaje funcionará como un click. El truco para lograr un loop es conectar el bang que va de la salida del objeto  \[readsf\~] a la entrada del mensaje de iniciación. De esta forma, cada vez que el audio termine, el bang se activará y “hará click” nuevamente en el mensaje.

![](/uploads/1_02.gif)