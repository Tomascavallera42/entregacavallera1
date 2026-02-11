Proyecto Backend Dockerizado - Proyecto1Cavallera

Proyecto backend desarrollado con Node.js, Express y MongoDB.
Incluye generación de datos mock, documentación con Swagger, tests funcionales y dockerización completa.

👤 Autor

DockerHub: tomascavallera

🚀 Tecnologías utilizadas

Node.js

Express

MongoDB / Mongoose

Swagger (swagger-jsdoc + swagger-ui-express)

Mocha / Chai / Supertest

Docker

📌 Endpoints del Proyecto
🔹 Mocks

GET /api/mocks/mockingusers → Genera 50 usuarios mock (no persiste en DB)

GET /api/mocks/mockingpets → Genera 20 mascotas mock

POST /api/mocks/generateData → Genera y guarda usuarios y mascotas en la base de datos

Body ejemplo:

{
  "users": 10,
  "pets": 5
}

🔹 Adoptions

GET /api/adoptions → Obtiene todas las adopciones

GET /api/adoptions/:id → Obtiene una adopción por ID

POST /api/adoptions → Crea una nueva adopción

Body ejemplo:

{
  "userId": "ID_DEL_USUARIO",
  "petId": "ID_DE_LA_MASCOTA"
}


DELETE /api/adoptions/:id → Elimina una adopción

📚 Documentación Swagger

La documentación interactiva se encuentra disponible en:
http://localhost:8080/api/docs

Incluye descripción de endpoints, parámetros y ejemplos de request.

🧪 Tests

El proyecto incluye tests funcionales utilizando Mocha, Chai y Supertest.

Para ejecutarlos:

npm install
npm test


Se debe tener MongoDB corriendo (local o en contenedor Docker).

🐳 Docker
Descargar imagen
docker pull tomascavallera/proyecto1cavallera:latest

Ejecutar contenedor MongoDB
docker run -d -p 27017:27017 --name mongo-test mongo

Ejecutar el proyecto
docker run -p 8080:8080 tomascavallera/proyecto1cavallera


Luego acceder a:
http://localhost:8080/api/docs

📦 Construir imagen manualmente

Desde la raíz del proyecto:

docker build -t proyecto1cavallera .
docker run -p 8080:8080 proyecto1cavallera
