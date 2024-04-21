# CAC-Cursos-Web
Página de "Cursos Web" creada en el curso de Fullstack python de Codo A Codo 2024 

# Integrantes:
+ Tadeo Riganti
+ Alejandro Ponce
+ Victor Rojas
+ Agustin 

# Metologia de trabajo: 

## Scrum
### Sprints:
En funcion del "Product log" vamos a definir el cronograma del proyecto y a dividirlo en fases llamadas "Sprint".
Al finalizar cada sprint (cada Domingo) vamos a revisar el estado de la sprint y repartir las actividades entre los miembros del equipo. Se asignaran tambien responsables de area, que tienen que supervisar el avance de las tareas durante el transcurso del sprint.

### Daily Standups:
A diferencia de las Daily Meetings, puede resolverse de manera asincronica.
La idea es enviar un mensaje al grupo de whatsapp todas las mañanas para mantenernos comunicados. Simplemente hay que mandar un mensaje en donde se responda de manera breve 3 preguntas:

1. ¿Qué hiciste ayer?
2. ¿Qué haras hoy?
3. ¿Qué (si es que hay algo) está bloqueando tu progreso?

Más alla de mantenernos en contacto, al igual que en las daily meetings, es que cada miembro del equipo pueda autogestionar sus tareas con el resto. De esta manera se elimina la necesidad de tener que asignar a un miembro como administrador; evitando perder recursos solo para gestionarnos.

## Desarrollo colaborativo
### Repositorio remoto / local
Es imperativo que, antes de empezar a desarrollar, realicen el siguiente protocolo:
- Avisar que van a realizar una tarea y preguntar si existe algun problema.
- Solo una vez que consiguen "Luz verde", tienen que hacer un pull del repositorio. Se aconseja que se hagan el habito de hacerlo diariamente.


### "Feature branching":
Al comienzo de cada Sprint, vamos a repartirnos las features a desarrollar de manera tal que podamos trabajar en paralelo y que no haya problemas a la hora de integrar el código.

El main del repositorio no debe modificarse directamente. Para colaborar se debera crear una branch con el nombre de la tarea/feature a resolver y una vez finalizado se realizara un "Pull request". Este debera ser revisado por otro miembro del equipo, para asegurarse que no haya conflictos.

1. Para crear una branch desde la terminal hay que pocisionarse en el origen de la cual querramos abrir una rama (normalmente va a ser el main o master):

$git checkout master

2. Luego creamos una rama nueva con el nombre de la feature o tarea a realizar, reemplazando los espacios por guiones medios '-':

$git branch <nombre-de-la-branch>
...
$git checkout <nombre-de-la-branch>

tambien pueden simplifcar estos 2 pasos en uno utilizando el comando:

$git checkout -b <nombre-de-la-branch>

3. Seguidamente hay que publicar la rama en el repositorio remoto. Desde Visual Studio Code se puede realizar en "Source Control" que se encuentra en el menu lateral, clickeando en el boton azul que dice "Publish branch" o "Publicar rama".

4. Una vez realizado todos los cambios, se suben los cambios al repositorio remoto:

$git push

5. Acto seguido nos dirigimos a github y, al actualizar la pagina, nos aparecera resaltado en amarillo un boton para realizar un "Pull request".

Al hacer click se nos dirigira a una nueva pagina donde deberemos agregar un titulo, una descripcion. Opcionalmente pueden indicarle a un miembro que lo revise en el panel derecho. Una vez terminado clickean el boton para hacer la request.
Nunca deberan hacer un merge sin consultar con otro miembro del equipo.
