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

> Continuar...
