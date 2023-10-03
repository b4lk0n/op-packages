type UnaryFn<A, B> = (a: A) => B

export function pipe<A>(a: A): A
export function pipe<A, B>(a: A, ab: UnaryFn<A, B>): B
export function pipe<A, B, C>(a: A, ab: UnaryFn<A, B>, bc: UnaryFn<B, C>): C
export function pipe<A, B, C, D>(
  a: A,
  ab: UnaryFn<A, B>,
  bc: UnaryFn<B, C>,
  cd: UnaryFn<C, D>,
): D
export function pipe<A, B, C, D, E>(
  a: A,
  ab: UnaryFn<A, B>,
  bc: UnaryFn<B, C>,
  cd: UnaryFn<C, D>,
  de: UnaryFn<D, E>,
): E
export function pipe<A, B, C, D, E, F>(
  a: A,
  ab: UnaryFn<A, B>,
  bc: UnaryFn<B, C>,
  cd: UnaryFn<C, D>,
  de: UnaryFn<D, E>,
  ef: UnaryFn<E, F>,
): F
export function pipe<A, B, C, D, E, F, G>(
  a: A,
  ab: UnaryFn<A, B>,
  bc: UnaryFn<B, C>,
  cd: UnaryFn<C, D>,
  de: UnaryFn<D, E>,
  ef: UnaryFn<E, F>,
  fg: UnaryFn<F, G>,
): G
export function pipe<A, B, C, D, E, F, G, H>(
  a: A,
  ab: UnaryFn<A, B>,
  bc: UnaryFn<B, C>,
  cd: UnaryFn<C, D>,
  de: UnaryFn<D, E>,
  ef: UnaryFn<E, F>,
  fg: UnaryFn<F, G>,
  gh: UnaryFn<G, H>,
): H
export function pipe<A, B, C, D, E, F, G, H, I>(
  a: A,
  ab: UnaryFn<A, B>,
  bc: UnaryFn<B, C>,
  cd: UnaryFn<C, D>,
  de: UnaryFn<D, E>,
  ef: UnaryFn<E, F>,
  fg: UnaryFn<F, G>,
  gh: UnaryFn<G, H>,
  hi: UnaryFn<H, I>,
): I
export function pipe(a: unknown, ...fns: UnaryFn<unknown, unknown>[]): unknown {
  if (fns.length === 0) {
    return a
  }

  return fns.reduce((acc, fn) => fn(acc), a)
}
