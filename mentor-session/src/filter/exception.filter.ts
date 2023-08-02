/* eslint-disable import/extensions */
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { GqlArgumentsHost, GqlContextType } from '@nestjs/graphql';
import { Response } from 'express';
import { GraphQLError } from 'graphql';
import { ZodValidationException } from 'nestjs-zod';
import { ZodError } from 'nestjs-zod/z';
import { QueryFailedError } from 'typeorm';
// import { LoggerDiscord } from '@/logger/loggerDiscord';
// import { ApolloError } from 'apollo-server-express';

@Catch()
export default class AllExceptionFilter implements ExceptionFilter {
  // constructor(private logger: LoggerDiscord) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    if (host.getType<GqlContextType>() === 'graphql') {
      GqlArgumentsHost.create(host);
      this.handleMessage(exception);

      if (exception instanceof ZodValidationException) {
        exception.message = JSON.stringify(exception.getZodError().errors);
      } else if (exception instanceof ZodError) {
        exception.message = exception.errors.toString();
      }
      this.handleMessage(exception);
      return exception;
    }
    const ctx = host.switchToHttp();
    const response: Response = ctx.getResponse();

    this.handleMessage(exception);
    return AllExceptionFilter.handleResponse(response, exception);
  }

  private static handleResponse(
    res: Response,
    exception:
      | HttpException
      | QueryFailedError
      | Error
      | ZodValidationException
      | ZodError
      | GraphQLError,
  ): void {
    let responseBody: any = { message: 'Internal server error' };
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

    if (exception instanceof GraphQLError) {
      responseBody = { statusCode, message: exception.message };
    } else if (exception instanceof ZodValidationException) {
      statusCode = exception.getStatus();
      responseBody = { statusCode, message: exception.getZodError() };
    } else if (exception instanceof ZodError) {
      responseBody = { statusCode: HttpStatus.BAD_REQUEST, message: exception.errors };
    } else if (exception instanceof HttpException) {
      responseBody = exception.getResponse();
      statusCode = exception.getStatus();
    } else if (exception instanceof QueryFailedError) {
      statusCode = HttpStatus.BAD_REQUEST;
      responseBody = {
        statusCode,
        message: exception.message,
      };
    } else if (exception instanceof Error) {
      responseBody = {
        statusCode,
        message: exception.stack,
      };
    }

    res.status(statusCode).json(responseBody);
  }

  private handleMessage(exception: HttpException | QueryFailedError | Error): void {
    let message = 'Internal Server Error';

    if (exception instanceof HttpException) {
      message = JSON.stringify(exception.getResponse());
    } else if (exception instanceof QueryFailedError && exception.stack) {
      message = exception.stack.toString();
    } else if (exception instanceof Error && exception.stack) {
      message = exception.stack.toString();
    }
    console.log(message);
    // this.logger.onWarn([message]);
  }
}
