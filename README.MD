# Instrucciones

- La app esta montada en un contenedor con una imagen de node y otra de postgre.


1) correr docker-compose up

Esto creara las imagenes y levantara el contenedor. Una vez que este corriendo se debe ejecutar en la consola de la app de node:

- npx prisma migrate reset --force

Con esto migramos la base de datos y corremos un seeder para generar 10 usuarios.

Luego importar las colecciones en postman desde el archivo `Node.postman_collection.json`. 

