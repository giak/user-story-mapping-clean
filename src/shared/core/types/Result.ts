export class Result<T> {
  private constructor(
    private readonly _isSuccess: boolean,
    private readonly _error: string | null,
    private readonly _value: T | null
  ) {}

  get isSuccess(): boolean {
    return this._isSuccess;
  }

  get isFailure(): boolean {
    return !this._isSuccess;
  }

  get error(): string | null {
    return this._error;
  }

  get value(): T {
    if (this.isFailure) {
      throw new Error("Cannot get value of a failure result");
    }
    return this._value as T;
  }

  static ok<U>(value: U): Result<U> {
    return new Result<U>(true, null, value);
  }

  static fail<U>(error: string): Result<U> {
    return new Result<U>(false, error, null);
  }
}
