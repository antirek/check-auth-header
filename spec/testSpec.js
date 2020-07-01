const MockExpressRequest = require('mock-express-request');
const MockExpressResponse = require('mock-express-response');

const checkAuthKey = require('../index');

const authHeader = 'X-API-Key';
const goodKey = 'secretKey';
const failKey = '1212';

const response = new MockExpressResponse();

describe('test', () => {
  describe('with array of keys', ()=> {
    const middleware = checkAuthKey({
      authKeys: [goodKey, 'otherSecretKey'],
      authHeader,
      debug: true,
    });

    it('good key', () => {
      const headers = {};
      headers[authHeader] = goodKey;
      const request = new MockExpressRequest({headers});

      middleware(request, response, (err) => {
        expect(err).toBe(undefined);
        console.log('err', err);
      });
    });

    it('fail key', () => {
      const headers = {};
      headers[authHeader] = failKey;
      const request = new MockExpressRequest({headers});

      middleware(request, response, (err) => {
        expect(err instanceof Error).toBe(true);
        console.log('err', err);
      });
    });
  });

  describe('with auth function', ()=> {
    const middleware = checkAuthKey({
      authFn: (key) => {
        return key === goodKey;
      },
      authHeader,
      debug: true,
    });

    it('good key', () => {
      const headers = {};
      headers[authHeader] = goodKey;
      const request = new MockExpressRequest({headers});

      middleware(request, response, (err) => {
        expect(err).toBe(undefined);
        console.log('err', err);
      });
    });

    it('fail key', () => {
      const headers = {};
      headers[authHeader] = failKey;
      const request = new MockExpressRequest({headers});

      middleware(request, response, (err) => {
        expect(err instanceof Error).toBe(true);
        console.log('err', err);
      });
    });
  });

  describe('with exclude path', ()=> {
    const middleware = checkAuthKey({
      authKeys: [goodKey],
      authHeader,
      debug: true,
      excludes: ['/v1/api'],
    });

    it('good key & excludes', () => {
      const headers = {};
      headers[authHeader] = goodKey;
      const request = new MockExpressRequest({headers,
        url: 'http://localhost:3030/v1/api'});

      middleware(request, response, (err) => {
        expect(err).toBe(undefined);
        console.log('err', err);
      });
    });

    it('good key & !excludes', () => {
      const headers = {};
      headers[authHeader] = goodKey;
      const request = new MockExpressRequest({headers,
        url: 'http://localhost:3030/v2/api'});

      middleware(request, response, (err) => {
        expect(err).toBe(undefined);
        console.log('err', err);
      });
    });

    it('fail key & excludes', () => {
      const headers = {};
      headers[authHeader] = failKey;
      const request = new MockExpressRequest({headers,
        url: 'http://localhost:3030/v1/api'});

      middleware(request, response, (err) => {
        expect(err).toBe(undefined);
        console.log('err', err);
      });
    });

    it('fail key & !excludes', () => {
      const headers = {};
      headers[authHeader] = failKey;
      const request = new MockExpressRequest({headers,
        url: 'http://localhost:3030/v2/api'});

      middleware(request, response, (err) => {
        expect(err instanceof Error).toBe(true);
        console.log('err', err);
      });
    });
  });
});
