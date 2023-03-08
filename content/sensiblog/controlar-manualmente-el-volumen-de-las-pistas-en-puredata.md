---
date: February 20, 2023 6:17 PM
thumbnail: /uploads/readsf-ejemplo.png
category: Sonido
tags:
  - sonido
  - PureData
title: Controlar manualmente el volumen de pistas de audio en PureData
title_eng: Play and loop audio tracks on PureData
body_eng: Comming soon.
---
<div>

En la entrada [Reproducción de audios en PD y generación de loops](https://www.ignacioserranol.com/sensiblog/2-reproducci%C3%B3n-de-audios-en-pd-y-generaci%C3%B3n-de-loops) vimos cómo abrir archivos de audio en PD y cómo reproducirlos de manera continua. Algo que generalmente deseamos es controlar ciertos parámetros del audio reproducido, como su dinámica y algunos efectos. En este post mostramos cómo manipular manualmente el volumen  de una pista de audio. (Por [Caro](https://sites.google.com/view/caroespinoza))

# 1.

En la primera figura, la manipulación de volumen se realiza controlando el paso entre el objeto \[readsf\~] y el objeto \[dac\~]. Una forma es como se muestra en la imagen. El signo “*” en los objetos conectados debajo de \[readsf\~] indica que la señal que está pasando por ellos será multiplicada. El símbolo “\~" indica que la señal a multiplicar es de audio. El número “1” indica que estamos multiplicando la señal por uno, es decir que no le estamos realizando ningún cambio.

# 2.

Si queremos tener un control manual de la amplitud en el tiempo, tenemos dos opciones: (1) agregar un número, el que podemos variar en el modo reproducción haciendo click en él y arrastrándolo hacia arriba y hacia abajo, (2) agregando un slider que se opera de la misma manera. Ambos ejemplos se ven en la segunda figura.

</div>

<div>

![](/uploads/volumen-constante.png)

</div>

<div>

# 3.

En la segunda figura, a mano izquierda, el objeto de multiplicación está por un lado conectado a la salida de \[readsf~] y por otro a una secuencia de: un número, un objeto divisor y otro número. El primer número es el que controlamos como usuarios. Aquí, podemos aumentar el valor dando saltos entre números enteros tanto como queramos. Lo anterior puede ser muy peligroso si estamos manipulando el volumen de audio, ya que PD no pone un límite interno al volumen que saldrá por nuestros parlantes o audífonos. Como medida de seguridad, agregamos el objeto de división. El número siguiente nos indica el resultado de la operación. Aunque funciona si tenemos cuidado, no es una forma recomendable para usos manuales. 

# 4.

En la segunda figura, a mano derecha, el objeto de multiplicación está conectado nuevamente por un lado a la salida \[readsf~] y por otro a una secuencia de: slider horizontal y número. El slider entrega un número que podemos controlar deslizándolo. Esta es una forma más segura de control manual, ya que haciendo click derecho sobre el slider podemos precisar el rango de valores entre los que nos moveremos. Mi recomendación es que el valor máximo de volumen sea “1”. Si ese volumen nos deja disconformes por encontrarlo muy bajo, es mejor modificar la amplitud de la señal en un programa externo (ver Edición básica de pistas de audio).

</div>

<div>

![](/uploads/control-manual-volumen.png)

</div>