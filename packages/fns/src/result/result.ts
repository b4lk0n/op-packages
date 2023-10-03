export type Err<E> = {
  readonly _tag: 'Err'
  readonly error: E
}

export type Ok<T> = {
  readonly _tag: 'Ok'
  readonly value: T
}

export type Result<E, T> = Err<E> | Ok<T>
