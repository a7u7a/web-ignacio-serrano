---
date: March 9, 2023 4:29 PM
thumbnail: /uploads/5.gif
category: Sonido
tags:
  - "#puredata"
title: "Osciladores en PD: visualización y sonido"
title_eng: "PD oscillators: visualization and sound"
body_eng: Comming soon.
---
<div>

En entradas anteriores hemos mostrado cómo incluir y manipular samples de audio en PD. Sin embargo, muchas veces es deseable generar nuestros propios sonidos. Aunque este es un camino complejo y hay millones de técnicas que podemos aplicar y aprender, hay una pieza fundamental que debemos entender: los osciladores. Los osciladores, en el mundo de PD, son básicamente arreglos de datos que varían en el tiempo de manera periódica, definidos por su forma, amplitud y frecuencia. Si bien existen una serie de osciladores que podemos generar (para eso pueden ver este [video](<https://www.youtube.com/watch?v=YDL-UwdSSj0>)), en este post hablaremos del más simple: la onda sinusoidal. (Por [Caro](https://sites.google.com/view/caroespinoza))

# 1.

Para generar una señal sinusoidal basta con utilizar el objeto \[osc~]. Este objeto tiene dos inlets: el de la izquierda nos permite controlar frecuencias en (Hz), mientras que el de la derecha nos permite mover la fase del oscilador. Tenemos además un outlet, que nos permite sacar la información en forma de señal de audio.

# 2.

En la figura vemos que conectado al inlet izquierdo del objeto \[osc\~] hay un número (138). Eso quiere decir que el oscilador tiene una frecuencia de 138 Hz. Luego, la salida está conectada a un multiplicador que hace el producto entre la señal sinusoidal y un número, el que podemos definir manual o externamente y que determinará la amplitud (volumen) de la señal (ver entradas Controlar manualmente el volumen de pistas y Controlar externamente el volumen de pistas). Finalmente este objeto multiplicador está conectado al \[dac\~] para generar un sonido. 

</div>

<div>

![](/uploads/5.gif)

</div>

<div>

# 3.

En el recuadro verde de la figura hay una representación de la función que estamos generando. Para visualizarlo, es necesario generar un objeto array. En él debe especificarse un nombre, que en nuestro caso es SINUSOIDAL. También debe especificarse un número de puntos a graficar, el que nosotros determinamos como 1000. Por último, es necesario establecer los rangos del gráfico en el eje horizontal X y vertical Y. En nuestro caso, los definimos como de 0 a 1000 y de -1 a 1, respectivamente.

# 4.

Para que los datos generados sean cargados en el gráfico, debe crearse un objeto \[tabwrite~ SINUSOIDAL]. Este objeto genera una tabla de datos que se cargará en nuestro gráfico. En el inlet del objeto conectamos la salida de los datos que queremos graficar y un metrónomo \[metro 100], que se encargará de actualizar nuestro gráfico cada 100 ms (podríamos definir otro tiempo). Por último, conectamos un \[bang] al metrónomo para echarlo a andar.

# 5.

Una vez que está todo conectado, prendemos el DSP, hacemos click en el bang y tendremos tanto la visualización como la escucha de la señal sinusoidal.

</div>