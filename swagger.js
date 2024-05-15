import swaggerAutogen from 'swagger-autogen';

const options = {
    openapi: '3.0.0',
}

const doc = {
    info: {
        title: 'Example Lucia',
        description: 'Example Lucia API document'
    },
    host: 'localhost:8000',
    tags: [
        {
            name: 'auth',
            description: '회원가입, 로그인 등 인증에 관한 것입니다'
        },
    ],
    components: {
        schemas: {
            securitySchemes:{
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer'
                }
            },
            signupSchema: {
                $email: 'example@example.com',
                $password: 'password',
                $retypePw: 'password',
            },
            loginSchema: {
                $email: 'example@example.com',
                $password: 'password',
            },
        }
    }
};

const outputFile = './swagger-output.json';
const routes = ['./dist/app.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(options)(outputFile, routes, doc);