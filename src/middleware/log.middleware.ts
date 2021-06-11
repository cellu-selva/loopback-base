import {MiddlewareContext} from '@loopback/express';
import jwt_decode from "jwt-decode";

export const requestlog = async (middlewareCtx: MiddlewareContext, next) => {
  const {request, response} = middlewareCtx;
  const logObj: any = {
    method: request.method,
    originalUrl: request.originalUrl,
    ip: request.ip,
    userId: '',
  }
  const userId = ''
  if (request.headers.authorization) {
    const authHeaderValue = request.headers.authorization;
    if (authHeaderValue.startsWith('Bearer')) {
      const parts = authHeaderValue.split(' ');
      if (parts.length === 2) {
        const token = parts[1];
        const decoded: any = jwt_decode(token);
        logObj.userId = decoded.id
      }
    }
  }

  console.log(
    'req :: ', logObj
  );
  try {
    // Proceed with next middleware
    const result = await next();
    // Process response
    logObj.status = response.statusCode;
    console.log(
      'Res :: ',
      logObj
    );
    return result;
  } catch (err) {
    // Catch errors from downstream middleware
    console.error(
      'Error :: ',
      logObj,
      err
    );
    throw err;
  }
};
