---
date: March 8, 2023 4:19 PM
thumbnail: /uploads/4.gif
category: Sonido
tags:
  - "#puredata"
title: Controlar externamente el volumen de pistas en PD, parte II
title_eng: Externally controlling the volume of tracks in PD, part II
body_eng: Comming soon.
---
<div>

![](/uploads/4.gif)

</div>

<div>

En la entrada [Controlar externamente el volumen de pistas en PD, parte I](https://www.ignacioserranol.com/sensiblog/reproducir-y-buclear-pistas-de-audio-en-puredata) revisamos los aspectos básicos de la comunicación entre PD y una placa externa, en nuestro caso Arduino UNO y MEGA, y cómo usar los datos procesados por éstas en el control de volumen de una pista de audio. En este post profundizaremos en cómo protegernos de valores indeseados, controlando el flujo de datos a partir de la expresión “if”. Utilizamos especialmente esto cuando los valores umbrales de los datos adquiridos varían en el tiempo por razones eléctricas, como en el caso de Viento fuerte. (Por [Caro](https://sites.google.com/view/caroespinoza))

# 1. 

En la figura se muestra la comunicación entre Arduino y PD (ver Controlar externamente el volumen de pistas, parte I), la generación de un loop de audio (ver Reproducción de audios en PD y generación de loops) y cómo se conectan ambos ejemplos para el control externo efectivo del audio (ver Controlar manualmente el volumen de pistas).

# 2. 

Hay, además de los objetos ya conocidos, uno nuevo llamado \[expr]. El objeto \[expr] quiere decir que luego de él escribiremos una expresión, como por ejemplo una expresión matemática (ver https://youtu.be/TD8j0-4heb0 para más detalles). En este caso, nosotros hemos añadido un condicional lógico “if”. El condicional “if” controla un valor de entrada, que en nuestro ejemplo corresponde al valor entregado por arduino dividido por 1000 (este valor nos permite contrarrestar variaciones eléctricas típicas al montar obras en que el sistema eléctrico del espacio interfiere con las mediciones) y que se expresa como “$f1”.

</div>

<div>

# 3.

Los condicionales lógicos en programación nos ayudan a controlar el flujo de datos e indica “Si el valor que me están ingresando cumple con cierta propiedad, entonces pasa esto. Si no, pasa esto otro”. En nuestro ejemplo, el condicional dice: Si el valor que me está entrando $f1 es mayor que 0.9, entonces la salida será 0.9. Si no es mayor que 0.9, la salida será $f1. Es decir, está controlando que nunca sobrepasemos el valor 1 de volumen. De esta manera obtenemos un control para evitar resultados indeseados.

</div>