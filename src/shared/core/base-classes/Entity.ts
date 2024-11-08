export abstract class Entity<T> {
  constructor(protected readonly _id: T) {}

  get id(): T {
    return this._id;
  }

  equals(other: Entity<T>): boolean {
    if (!(other instanceof Entity)) return false;
    return this._id === other._id;
  }
}
