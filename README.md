# check-auth-header

Middleware for express.js for check key in auth header

## Usage

### Valid auth with header X-API-Key: secretKey

`````javascript
const checkAuthKey = require('check-auth-header');

const app = express();

app.use(checkAuthKey({
    authKeys: ['secretKey'],
    authHeader: 'X-API-Key',
}));

`````

### Valid auth via function

`````javascript
const authFn = (key) => {
    return key === 'secret',
};

app.use(checkAuthKey({
    authFn,
    authHeader: 'X-API-Key',
}));

`````


### Exclude path  / for API scheme or readme

`````javascript
const authFn = (key) => {
    return key === 'secret',
};

app.use(checkAuthKey({
    authFn,
    authHeader: 'X-API-Key',
    excludes: ['/v1/api']
}));

`````