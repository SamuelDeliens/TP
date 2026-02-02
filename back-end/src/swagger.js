import swaggerUi from 'swagger-ui-express';

import yaml from 'yamljs';

const swaggerDefinition = yaml.load('./swagger.yaml');

export { swaggerDefinition, swaggerUi };
