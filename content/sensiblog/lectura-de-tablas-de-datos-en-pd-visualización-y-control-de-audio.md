---
date: March 10, 2023 4:35 PM
thumbnail: /uploads/6.gif
category: Sonido
tags:
  - "#puredata"
title: Lectura de tablas de datos en PD, visualización y control de audio
title_eng: PD data table reading, visualization and audio control
body_eng: Comming soon.
---
<div>

En la entrada [Osciladores en PD: visualización y sonido](https://www.ignacioserranol.com/sensiblog/osciladores-en-pd-visualizaci%C3%B3n-y-sonido) revisamos cómo generar un sonido a partir de osciladores y la manera de visualizar estos osciladores. En ese caso, utilizamos un array al que le cagamos los datos generados por el objeto \[osc~]. En este post veremos cómo cargar datos de un archivo externo y cómo usarlos para controlar el volumen de un sonido, resultados que luego pueden ser extrapolables al control de cualquier otro parmetro. (Por [Caro](https://sites.google.com/view/caroespinoza))

# 1.

Primero debemos tener nuestro archivo de datos. Es importante que los datos sean numéricos (float, double o int), o sino PD no podrá leerlos. En nuestro caso creamos el archivo HM1.txt donde se registran los valores de humedad medidos en una muestra de biomaterial. 

# 2.

En nuestro caso usaremos los datos para controlar el volumen de audio, por lo que necesitamos que el valor máximo sea 1. Para lograr esto, revisamos nuestra tabla de datos y observamos que el número mayor es 100. Debemos guardar este número para normalizar nuestra tabla más adelante.

# 3.

Para la visualización creamos un array del tamaño del largo de nuestro archivo de datos, el que llamamos HM1. El mensaje ; HM1 read HM1.txt lee el archivo de datos y lo imprime en el gráfico amarillo de nuestra figura.

</div>

<div>

![](/uploads/6.gif)

# 4.

Para controlar el volumen, necesitamos ir leyendo uno a uno los datos de la tabla, a un tiempo determinado. Para esto usamos el objeto \[tabread]. Este objeto lee los datos de un arreglo en localizaciones que nosotros especificamos según el número de índice, que se conecta al único inlet del objeto. En el mismo inlet se puede conectar un mensaje set que indica qué arreglo se está leyendo. En nuestro caso, leemos el arreglo HM1 y al abrir el programa, el índice está en 0.

# 5.

El outlet del objeto \[tabread] muestra el valor de la tabla en el punto indicado por el índice. Como decíamos anteriormente, nos interesa que estos valores controlen audio, por lo que es deseable que no superen el valor de 1. Sabiendo el máximo de la tabla (100), dividimos la salida de \[tabread] por 100 y así nos aseguramos de estar trabajando con valores menores o iguales a 1. El resultado de la división es usado en nuestro ejemplo para controlar el volumen de un archivo de audio.

</div>

<div>

# 6.

Para que el índice corra, y no se quede siempre en el valor de iniciación, utilizamos el objeto \[counter], el que nos ayuda a hacer correr un contador en números enteros. Este objeto tiene una serie de entradas y salidas, pero nos centraremos en dos entradas y una salida en particular.

# 7.

En la primera entrada, a mano izquierda, conectaremos un metrónomo que nos dirá cada cuántos milisegundos el contador avanzará al número siguiente.

# 8.

En la primera salida, a mano izquierda, conectaremos un número que nos indicará el valor en que está la cuenta. Bajo este número se conecta un objeto \[select] o simplemente \[sel] acompañado de un número. Cuando la entrada a este objeto iguala su argumento, dispara un bang por su salida izquierda. En nuestro caso usamos \[sel 4000], pues el largo de nuestro arreglo es de 4000 datos. 

# 9.

Por último, la cuarta entrada de izquierda a derecha de nuestro objeto \[counter] resetea el contador al ser activada por un bang. Así, usamos la salida del objeto \[sel] para reiniciar el contador cada vez que alcanzamos el máximo de datos.

</div>