export abstract class ValueObject<T> {
  constructor(protected readonly _value: T) {}

  get value(): T {
    return this._value;
  }

  equals(other: ValueObject<T>): boolean {
    if (!(other instanceof ValueObject)) return false;
    return this._value === other._value;
  }
}
