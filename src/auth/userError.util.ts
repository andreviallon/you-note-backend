import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

export class UserError {
  public static handleUserError(error) {
    switch (error.code) {
      case '23505':
        this.duplicatedEmail();
      default:
        this.internalServerError();
    }
  }

  public static duplicatedEmail(): string {
    throw new ConflictException('Email already exists');
  }

  public static internalServerError(): string {
    throw new InternalServerErrorException('Something went wrong... :(');
  }
}
