import { INestApplication } from '@nestjs/common';
import {
  DocumentBuilder,
  ExpressSwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';

const ICONIC_PRIMARY = '#232323';
const ICONIC_SECONDARY = '#4d4d4d';
const ICONIC_WHITE = '#ffffff';
const ICONIC_BLUE = '#42abc8';
const ICONIC_GREEN = '#349C5F';
const ICONIC_RED = '#EF423C';
const ICONIC_ORANGE = '#ff8e4d';

// const ICONIC_PRIMARY = '#043461';
// const ICONIC_SECONDARY = '#4d4d4d';
// const ICONIC_WHITE = '#ffffff';
// const ICONIC_BLUE = '#1475d4';
// const ICONIC_GREEN = '#9ee244';
// const ICONIC_RED = '#f42684';
// const ICONIC_ORANGE = '#00d6cb';

//http://localhost:3000/api
export const createSwaggerDocument = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('MyCV API Docs')
    .setDescription('Swagger documentation for the MyCV API.')
    .setVersion('1.0')
    .addBearerAuth(
      {
        description: `Please enter token in following format: Bearer <JWT>`,
        name: 'Authorization',
        bearerFormat: 'Bearer', // I`ve tested not to use this field, but the result was the same
        scheme: 'Bearer',
        type: 'http', // I`ve attempted type: 'apiKey' too
        in: 'Header',
      },
      'access-token', // This name here is important for matching up with @ApiBearerAuth() in your controller!
    )
    .build();

  const options: ExpressSwaggerCustomOptions = {
    customSiteTitle: 'MyCV API Docs',
    customCss: `
      /* header */
      .swagger-ui .topbar { background-color: ${ICONIC_PRIMARY}; height: 60px; }
      .swagger-ui .topbar-wrapper::before { content: 'Swagger: The ICONIC' }
      .swagger-ui .topbar-wrapper { height: 40px; color: ${ICONIC_WHITE}; font-size: 24px; }
      .swagger-ui img { display: none }

      /* text */
      .swagger-ui .info .title { color: ${ICONIC_PRIMARY} }
      .swagger-ui .info p { color: ${ICONIC_PRIMARY} }
      .swagger-ui .opblock-tag { color: ${ICONIC_PRIMARY} }
      .swagger-ui .info .title small.version-stamp { background-color: ${ICONIC_BLUE}  }
      .swagger-ui .parameter__name.required:after { color: ${ICONIC_RED}b3 }

      /* endpoints */
      .swagger-ui .opblock .opblock-summary-path { color: ${ICONIC_SECONDARY} }
      /* GET */
      .swagger-ui .opblock.opblock-get .opblock-summary-method { background: ${ICONIC_BLUE} }
      .swagger-ui .opblock.opblock-get { background: ${ICONIC_BLUE}1a; border-color: ${ICONIC_BLUE}; }
      /* POST */
      .swagger-ui .opblock.opblock-post .opblock-summary-method { background: ${ICONIC_GREEN} }
      .swagger-ui .opblock.opblock-post { background: ${ICONIC_GREEN}1a; border-color: ${ICONIC_GREEN}; }
      /* PATCH */
      .swagger-ui .opblock.opblock-patch .opblock-summary-method { background: ${ICONIC_ORANGE} }
      .swagger-ui .opblock.opblock-patch { background: ${ICONIC_ORANGE}1a; border-color: ${ICONIC_ORANGE}; }
      /* DELETE */
      .swagger-ui .opblock.opblock-delete .opblock-summary-method { background: ${ICONIC_RED} }
      .swagger-ui .opblock.opblock-delete { background: ${ICONIC_RED}1a; border-color: ${ICONIC_RED}; }

      /* parameters underline */
      .swagger-ui .opblock.opblock-get .tab-header .tab-item.active h4 span:after { background: ${ICONIC_BLUE} }
      .swagger-ui .opblock.opblock-post .tab-header .tab-item.active h4 span:after { background: ${ICONIC_GREEN} }
      .swagger-ui .opblock.opblock-patch .tab-header .tab-item.active h4 span:after { background: ${ICONIC_ORANGE} }
      /* summary border */
      .swagger-ui .opblock.opblock-get .opblock-summary { border-color: ${ICONIC_BLUE}  }
      .swagger-ui .opblock.opblock-post .opblock-summary { border-color: ${ICONIC_GREEN}  }
      .swagger-ui .opblock.opblock-patch .opblock-summary { border-color: ${ICONIC_ORANGE}  }

      /* buttons */
      .swagger-ui .btn.cancel { border-color: ${ICONIC_RED}; color: ${ICONIC_RED}; }
      .swagger-ui .btn.execute { background-color: ${ICONIC_BLUE}; border-color: ${ICONIC_BLUE}; }
    `,
  };

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, options);
};
