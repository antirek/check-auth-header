# check-auth-header
Middleware for express.js

`````
const checkApikey = require('check-auth-header');

const app = express();

app.use(checkApikey(
    apiKeys: ['secretKey', 'otherSecretKey'],
    authHeader: 'X-API-Key',
    excludes: ['/v1/api'],
}));


`````