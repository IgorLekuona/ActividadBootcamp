# Actividad de Evaluación de Bootcamp

A continuación se explicarán los pasos necesarios para poder ejecutar este proyecto en cualquier máquina.

1. Primero de todo, es necesario prepararse un network de docker sobre los que lanzaremos los containers para que esten comunicados entre ellos.

```bash
docker network create -d bridge master-fullstack-network
```

2. Es necesario tener dockerizado un container de mongoDB con el nombre mongodb en el puerto 27017. Del mismo modo, es necesario crear una base de datos de nombre "mstr-fs" dentro del contenedor de mongoDB y una colección con el nombre "master-fullstack" dentro de esta base de datos, y finalmente importar dentro de esta colección los datos que se encuentran en el user.js . 

```bash
docker run --name mongodb -d -p 27017:27017 --network master-fullstack-network mongo
```

En caso de que el container tenga alguna característica (nombre, puerto, nombre de db, nombre de colección...) distinta a las que estan especificadas en este proyecto, es recomendable cambiar las referencias a estas en el documento de app.js para asegurarse la correcta conexión.

```javascript
const URL = 'mongodb://mongodb:27017';
const DB_NAME = 'mstr-fs';
const COLLECTION_NAME = 'master-fullstack';
```

![8df349a1b136fa248a359e1acd493ed5](https://user-images.githubusercontent.com/132001536/236911428-fbff6a51-a7ae-4686-9f2f-6e243145e5d1.png)

3. A continuación es necesario clonarse este repositorio, y al tenerlo al completo en un directorio, lanzar el comando de "npm install" para descargar todos los paquetes sobre las que haya dependencia en el proyecto.

```bash
npm install
```

4. Finalmente para ejecutar el proyecto en un container de Docker procederemos a ejecutar lo siguiente en el directorio del proyecto:

```bash
docker build -t api-mongo .
docker run -p 8080:8080 -d name api-mongo-container --network master-fullstack-network api-mongo
```

![f645d6f6ff968bc174250e5a0e7f04ff](https://user-images.githubusercontent.com/132001536/236912315-445446ec-a484-4dd0-a86f-233e4dd014ef.png)
