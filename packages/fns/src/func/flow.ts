type UnaryFn<A, B> = (a: A) => B

export function flow<A, B>(ab: UnaryFn<A, B>): UnaryFn<A, B>
export function flow<A, B, C>(
  ab: UnaryFn<A, B>,
  bc: UnaryFn<B, C>,
): UnaryFn<A, C>
export function flow<A, B, C, D>(
  ab: UnaryFn<A, B>,
  bc: UnaryFn<B, C>,
  cd: UnaryFn<C, D>,
): UnaryFn<A, D>
export function flow<A, B, C, D, E>(
  ab: UnaryFn<A, B>,
  bc: UnaryFn<B, C>,
  cd: UnaryFn<C, D>,
  de: UnaryFn<D, E>,
): UnaryFn<A, E>
export function flow<A, B, C, D, E, F>(
  ab: UnaryFn<A, B>,
  bc: UnaryFn<B, C>,
  cd: UnaryFn<C, D>,
  de: UnaryFn<D, E>,
  ef: UnaryFn<E, F>,
): UnaryFn<A, F>
export function flow<A, B, C, D, E, F, G>(
  ab: UnaryFn<A, B>,
  bc: UnaryFn<B, C>,
  cd: UnaryFn<C, D>,
  de: UnaryFn<D, E>,
  ef: UnaryFn<E, F>,
  fg: UnaryFn<F, G>,
): UnaryFn<A, G>
export function flow<A, B, C, D, E, F, G, H>(
  ab: UnaryFn<A, B>,
  bc: UnaryFn<B, C>,
  cd: UnaryFn<C, D>,
  de: UnaryFn<D, E>,
  ef: UnaryFn<E, F>,
  fg: UnaryFn<F, G>,
  gh: UnaryFn<G, H>,
): UnaryFn<A, H>
export function flow<A, B, C, D, E, F, G, H, I>(
  ab: UnaryFn<A, B>,
  bc: UnaryFn<B, C>,
  cd: UnaryFn<C, D>,
  de: UnaryFn<D, E>,
  ef: UnaryFn<E, F>,
  fg: UnaryFn<F, G>,
  gh: UnaryFn<G, H>,
  hi: UnaryFn<H, I>,
): UnaryFn<A, I>
export function flow(
  ...fns: UnaryFn<unknown, unknown>[]
): UnaryFn<unknown, unknown> {
  return (a: unknown) => fns.reduce((acc, fn) => fn(acc), a)
}
