<p>UNIVERSIDAD DE SAN CARLOS DE GUATEMALA</p>
<p>FACULTAD DE INGENIERIA</p>
<p>ESCUELA DE CIENCIAS Y SISTEMAS</p>
<p>SISTEMAS OPERATIVOS 1</p>
<p>PRIMER SEMESTRE 2023</p>

---


---


---


---


---


---


---

<center> <h1>PRACTICA #2</h1> </center>



---


---


---


---




| Nombre   |      Carnet      |
|----------|:-------------:|
| Alvaro Emmanuel Socop Pérez | 202000194 |

---


---


---


---




---


---


---


---


---

# <a name="nothing"></a>MANUAL TECNICO


>“Programa Orquestado en Docker-compose.”
## <a name="intro" ></a>ÍNDICE
| Topico | Link |
| ------ | ------ |
| Introducción | [Ir](#intro) |
| Objetivos y alcances del sistema| [Ir](#ob) |
| Componentes utilizados | [Ir](#sis) |
| Sistema Operativo | [Ir](#sis) |
| Tecnologías utilizadas | [Ir](#tech) |
| Interfaz del programa | [Ir](#inter) |
| Conclusiones | [Ir](#Conclu) |



# Calculadora Básica Orquestado en Docker-Compose

## <a name="intro" ></a>INTRODUCCIÓN

Esta documentación describe la implementación de una aplicación de MONITOR DE RECURSOS utilizando React para la interfaz de usuario, Golang para el back-end, NodeJS para la api y MySQL para almacenar los registros de los procesos e informacion de la memoria RAM obtenido del Kernel de la maquina la cual se este ejecutando. Además, se utilizó Docker para desplegar la aplicación y se desplego la aplicacion en VM de GCP (Google Cloud Platform) igualmente teniendo la base de datos en la nube.

## Objetivos

- Conocer el kernel de Linux y sus módulos.
- Comprender y utilizar herramientas de Google Cloud Platform.
- Utilizar máquinas virtuales de GCP.
- Creación de módulos.
- Utilizar CloudSQL

## Arquitectura:

![a](assets/arq.png)

## Componentes utilizados

La aplicación de calculadora básica se compone de varios componentes, cada uno de los cuales se describe a continuación:

### React
React se utiliza para crear la interfaz de usuario del dashboard la cual muestra en tiempo real los datos de los procesos del CPU y la RAM.



### Golang

Se creo el back-end de la aplicación de monitoreo de recursos. En este caso, se utiliza para procesar y guardar en la db lo que se encuentra en el archivo /PROC.
![a](code2.png)


### MySQL

Utilizado para almacenar los registros de CPU y RAM.

La siguiente declaración "CREATE TABLE mydb.cpu_ram" crea una nueva tabla llamada "cpu_ram" en el esquema "mydb". La tabla "operacion" tiene 5 columnas:

![a](code3.png)

- "ram_json" (JSON):  representa todos los datos de RAM que se ejecutan a travez del tiempo en la VM.
- "cpu_json" (JSON):  representa todos los datos de CPU que se ejecutan a travez del tiempo en la VM.
- "cpu_process" (JSON): representa todos los procesos que se estan ejecutando en la VM.
- "percent_ram" (int):  representa el valor puntual del porcentaje de memoria RAM utilizado.
- "percent_cpu" (int):  representa el resultado del procesamiento de CPU.

## INTERFAZ GRAFICA
![a](assets/1.png)
![a](assets/2.png)
![a](assets/3.png)
![a](assets/4.png)
## COMANDOS PARA INICIAR VM1
```
cd "/home/alvaro24_ingenieria/so1_202000194/Practica2/module"
bash eje.sh
cd "/home/alvaro24_ingenieria/so1_202000194/Practica2/module"
sudo docker build -t practica2_backend . --no-cache
sudo docker run  -p 8080:8080 practica2_backend

```
## COMANDOS PARA INICIAR FRONTEND VM2
```
cd "/home/alvaro24_ingenieria/so1_202000194/Practica2/frontend"
sudo docker-compose up -d

// para construirlo FRONTEND
sudo docker-compose build --no-cache


```

sudo apt-get update
sudo apt-get install -y build-essential
sudo apt-get install -y linux-headers-$(uname -r)
    Instala la última versión del kernel:
sudo apt-get install linux-generic



## Conclusiones

La aplicación de calculadora básica con React, Golang, MySQL y Docker Compose es una excelente demostración de cómo se pueden utilizar varias tecnologías juntas para crear una aplicación funcional y moderna. Al utilizar estas herramientas y tecnologías, se pueden construir aplicaciones más robustas y escalables. Además, el uso de contenedores de Docker hace que la implementación y el despliegue de la aplicación sean más sencillos y eficientes.



![a](https://www.patterns.dev/img/reactjs/react-logo@3x.svg)
## Anexos
