
const checkAuthKey = ({
    authKeys = [],
    authFn = null,
    authHeader = 'X-API-KEY',
    excludes = [],
    debug = false,
    status401onFail = false,
  }) => {

  const log = (...args) => {
    if (debug) console.log(...args);
  };
  
  const middlewareFn = (req, res, next) => {
    const authKeyValue = req.get(authHeader);
    log('req.path:', req.path, 
      ', authHeader:', authHeader,
      ', authKey:', authKeyValue);

    if (excludes.indexOf(req.path) !== -1) {
      log('auth not required');
      return next();
    }

    if (authFn && authFn(authKeyValue)) {
      log('auth function allow access');
      return next();
    }

    if (authKeys && authKeys.length !== 0) {
      if (authKeys.indexOf(authKeyValue) !== -1) {
        log('auth verified good', authKeyValue);
        return next();
      }
    }

    log('Invalid auth key:', authKeyValue);

    if (!status401onFail) {
      return next(new Error('Invalid auth key ' + authKeyValue));
    }

    res.status(401).send({
      error: 'Invalid auth key',
      authHeader,
    });
  };

  return middlewareFn;
};

module.exports = checkAuthKey;