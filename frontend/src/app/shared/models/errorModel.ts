export enum Severity {
  LOW,
  NORMAL,
  HIGH
}

export class ErrorModel {
  private readonly _severity: Severity;
  private readonly _message: string;

  private constructor(severity: Severity, message: string) {
    this._severity = severity;
    this._message = message;
  }

  get severity(): Severity {
    return this._severity;
  }

  get message(): string {
    return this._message;
  }

  static initialiseError(severity: Severity, message: string): ErrorModel {
    return new ErrorModel(severity, message);
  }
}
