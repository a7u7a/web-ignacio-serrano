---
date: February 27, 2023 3:55 PM
thumbnail: /uploads/3.gif
category: Sonido
tags:
  - PureData
  - sonido
title: "Controlar externamente el volumen de pistas en PD, parte I "
title_eng: "Externally controlling the volume of tracks in PD, part I "
body_eng: Comming soon.
---
<div>

En la entrada [Controlar manualmente el volumen de pistas en PD](https://www.ignacioserranol.com/sensiblog/controlar-manualmente-el-volumen-de-las-pistas-en-puredata) revisamos dos maneras de manipular de manualmente el volumen de una pista de audio. En general, cuando diseñamos obras interactivas como Viento Fuerte y Ondita Sensible I, lo que queremos es el control externo de una serie de parámetros, entre ellos el volumen. Para controlar externamente el volumen del audio es necesario comunicar PD con un dispositivo que sea capaz de procesar estímulos mediante la conexión a sensores y transformarlos en datos. En el caso de la obra Viento fuerte el dispositivo de control corresponde a un Arduino UNO, mientras que para Ondita Sensible I usamos un Arduino MEGA. El protocolo que mostraremos a continuación sirve para ambas placas. (Por [Caro](https://sites.google.com/view/caroespinoza))

# 1.

Existe más de un protocolo para lograr la comunicación. En este proyecto actualizamos uno propuesto en el siguiente [link](https://www.youtube.com/watch?v=WPj-clNbvfk) 

# 2.

En la figura se ejemplifica la comunicación con un Arduino UNO que está enviando dos datos: 1 y 2. El punto importante acá es el número que acompaña a nuestro objeto \[cyclone/zl group 3]. El número indica que estamos enviando 3 datos separados, los dos valores que procesó arduino y un separador. Si quisiéramos recibir 10, tendríamos que cambiar ese valor por 19. Si quisiéramos recibir N datos, tendríamos que cambiarlo por 2*N-1. El otro punto importante es el objeto \[unpack f f]. En este caso, cada “f” indica la llegada de un dato (sin separador) y se generarán tantos outlets como número de “f”. Es decir, si estuviéramos recibiendo 10 datos, deberíamos incluir 10 “f” separadas por un espacio.

</div>

<div>

![](/uploads/3.gif)

</div>

<div>

# 3.

Por último, para transformar estos datos en controles de volumen (u otro parámetro) en nuestro patch de PD, basta con multiplicar nuestras señales de audio por estos datos. Los detalles de lo anterior están en el post [Controlar manualmente el volumen de pistas en PD](https://www.ignacioserranol.com/sensiblog/controlar-manualmente-el-volumen-de-las-pistas-en-puredata). Tal como indicamos ahí, deben tenerse ciertos cuidados para evitar daños auditivos al realizar el control externo. En Controlar externamente el volumen de pistas, parte II, se mostrar un ejemplo más elaborado de control externo.

</div>