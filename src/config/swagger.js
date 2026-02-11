import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Adoption API",
      version: "1.0.0",
      description: "API para gestion de usuarios, mascotas y adopciones"
    }
  },
  apis: [
    "./src/routes/mocks.router.js",
    "./src/routes/adoption.router.js"
  ]
  
};

export const swaggerSpecs = swaggerJSDoc(options);
