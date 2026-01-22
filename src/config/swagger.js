import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Mocking Users API",
      version: "1.0.0"
    }
  },
  apis: ["./src/routes/mocks.router.js"]
};

export const swaggerSpecs = swaggerJSDoc(options);
