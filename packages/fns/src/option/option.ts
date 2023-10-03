export type None = {
  readonly _tag: 'Nothing'
}

export type Some<A> = {
  readonly _tag: 'Some'
  readonly value: A
}

export type Option<A> = None | Some<A>
