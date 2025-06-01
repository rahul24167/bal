// src/swagger.ts
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import path from 'path';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Workout Tracker API',
      version: '1.0.0',
      description: 'API documentation for the Workout Tracker App',
    },
  },
  apis: [path.resolve(__dirname, '../../../../doc/**/*.yaml')], // ✅ Relative path to doc/
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerUi, swaggerSpec };


