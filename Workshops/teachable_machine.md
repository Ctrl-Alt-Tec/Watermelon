---
name: Máquina Enseñable
description: Introducción a Machine Learning, sin necesidad de programar
author: @MatthewStanciu
category: Talleres
---

# Máquina Enseñable 🤖

[Teachable Machine](https://teachablemachine.withgoogle.com) es un sitio web hecho por Google que permite rápidamente crear modelos de Machine Learning sin necesidad de programar. Es una forma fantástica de aprender los conceptos fundamentales y aplicarlos en proyectos interesantes sin necesidad de adentrarse en la matemática complicada normalmente requerida para este campo. En este taller, estaremos construyendo un simple sitio web que detecte si tu cámara te ve solx o con otro objeto (e.g. tu teléfono).

## ¿Cómo aprenden las máquinas?

A cada rato escuchamos el término *Machine Learning*, o *Aprendizaje de Máquina*, pero ¿qué significa que una máquina aprenda?
Un modelo de aprendizaje de máquina es un modelo matemático para la realización de dicho proceso. Algunos incluyen [redes neuronales artificiales](https://en.wikipedia.org/wiki/Artificial_neural_network), [árboles de decisiones](en.wikipedia.org/wiki/Decision_tree_learning), and [análisis de regresiones](en.wikipedia.org/wiki/Regression_analysis). Pero como dijimos antes, no tenemos que preocuparnos por estas cosas por ahora, la plataforma creará su propio modelo tras escena. 

Los modelos de Machine learning son *entrenados* con grandes cantidades de datos en un intento de "enseñar" al modelo cómo resolver correctamente un problema en específico (por ejemplo, cómo se ve un Hot Dog). 

## Entrenando nuestro modelo

Primero visitaremos [teachablemachine.withgoogle.com](https://teachablemachine.withgoogle.com) y daremos click en "Get Started". Se presentará la opción de crear un proyecto de audio, iagen o pose. Por ahora, haremos uno de imágen.

![](https://raw.githubusercontent.com/hackclub/hackclub/master/workshops/teachable_machine/img/homepage.JPG)

![](https://raw.githubusercontent.com/hackclub/hackclub/master/workshops/teachable_machine/img/imageproject.PNG)

Tenemos dos posibles estados según el objetivo del taller: identificar a la persona con y sin objeto. 
Por ello, renombraremos "Class 1" a "me" (yo) y "Class 2" a "me with [some object]" (yo con algún objeto)

![](https://raw.githubusercontent.com/hackclub/hackclub/master/workshops/teachable_machine/img/renameclass.GIF)

Ahora entrenaremos el modelo. Enciende tu webcam para cada clase y da click en "Hold to Record" (pulsar para grabar) hasta que tengas unas cuantas muestras grabadas. Intenta tomar tantas fotos y capturar tantos ángulos, posiciones, variaciones, etc. puedas. Entre más datos haya, el modelo aprenderá mejor la diferencia entre ambas colecciones de datos. 

![](https://raw.githubusercontent.com/hackclub/hackclub/master/workshops/teachable_machine/img/imagesamples.PNG)

Una vez que hayas grabado suficientes muestras, da click en "Train Model" (entrenar modelo). El tiempo que toma entrenar el modelo dependerá del número de muestras pero usualmente toma alrededor de 30 segundos. 

Ya que el modelo esté entrenado, debe aparecer una vista previa. ¡Pruébala! Si está borrosa en algunos ángulos o posiciones, regresa y graba mas muestras con esos ángulos o posiciones. Continúa con el mismo proceso hasta que el modelo identifique consisistentemente la mlase correcta.

En nuestro ejemplo se vería así:

![](https://raw.githubusercontent.com/hackclub/hackclub/master/workshops/teachable_machine/img/model.GIF)

## Exportando nuestro modelo

"Teachable Machine" almacenara tu modelo en sus servidores para poder usarlo en cualquier proyecto que necesites. Para hacerlo, de click en "Export Model" (exportar modelo), y luego en "Upload my model" (subir mi modelo) en la ventana emergente. Tras unos segundos deberá indicar el link a nuestro modelo. 

![](https://raw.githubusercontent.com/hackclub/hackclub/master/workshops/teachable_machine/img/uploadedmodel.PNG)
 
> Si te interesa ver los datos *crudos* de tu modelo, copia el link del modelo y añádele `model.json` al final.

## Insertar en un sitio web
Ahora es momento de añadir el modelo a tu propio proyecto. 
Desplázate hacia abajo y

> Terminar...
