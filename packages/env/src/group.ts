type CamelCase<S extends string> = S extends `${infer P1}_${infer P2}`
  ? `${Lowercase<P1>}${Capitalize<CamelCase<P2>>}`
  : Lowercase<S>

type Split<
  TString extends string,
  TSeparator extends string,
  TAcc extends string[] = [],
> = string extends TString
  ? string[]
  : TString extends TSeparator
  ? TAcc
  : TString extends `${infer HEAD}${TSeparator}${infer TAIL}`
  ? Split<TAIL, TSeparator, [...TAcc, HEAD]>
  : [...TAcc, TString]

type ToPositive<
  TNumber extends number,
  TArray extends unknown[],
> = `${TNumber}` extends `-${infer P extends number}`
  ? Slice<TArray, P>['length']
  : TNumber

type InitialItems<
  TArray extends unknown[],
  TCount extends number,
  TAcc extends unknown[] = [],
> = TAcc['length'] extends TCount | TArray['length']
  ? TAcc
  : InitialItems<TArray, TCount, [...TAcc, TArray[TAcc['length']]]>

type Slice<
  TArray extends unknown[],
  TStart extends number = 0,
  TEnd extends number = TArray['length'],
> = InitialItems<TArray, ToPositive<TEnd, TArray>> extends [
  ...InitialItems<TArray, ToPositive<TStart, TArray>>,
  ...infer Rest,
]
  ? Rest
  : []

type KeysToNestedObject<TKeys extends string[], TValue> = TKeys extends [
  infer First,
  ...infer Rest,
]
  ? First extends string
    ? Rest extends string[]
      ? {
          [P in CamelCase<First>]: KeysToNestedObject<Rest, TValue>
        }
      : never
    : never
  : TValue

type FirstKey<TKey extends string, TGroupBy extends string> = Split<
  TKey,
  TGroupBy
>[0]

export type Group<TFlatObject extends object, TGroupBy extends string = '.'> = {
  [K in keyof TFlatObject as CamelCase<
    FirstKey<K & string, TGroupBy & string> & string
  >]: KeysToNestedObject<
    // @ts-expect-error - look later
    Slice<Split<K & string, TGroupBy & string>, 1>,
    TFlatObject[K]
  >
}
