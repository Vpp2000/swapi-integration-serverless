export class HttpError extends Error {
  constructor(public statusCode: number, message:string) {
    super(message);
  }

  public getErrorMessage(): string {
    return this.message;
  }
}
