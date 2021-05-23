export interface ResponseStatusInterface<T> {
  readonly _status: number;
  readonly _message: string;
  readonly _object: T;
}
