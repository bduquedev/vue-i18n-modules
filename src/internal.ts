import type { DefineModules } from './augment'
import type { Dictionary } from './types'

/**
 * Recursively extracts the keys of type `T`, prepending the parent key to the
 * current key, separated by `Separator`.
 *
 * @example
 * ```ts
 * type Example = {
 *   foo: { bar: { baz: 'hello' } },
 *   a: { b: { foo: 1, bar: 2 } },
 * }
 *
 * type Keys = ConcatKeys<Example, '.'>
 *
 * Keys == 'foo' | 'foo.bar' | 'foo.bar.baz' | 'a' | 'a.b' | 'a.b.foo' | 'a.b.bar'
 * ```
 */
export type ConcatKeys<
  T,
  Separator extends string = '.',
  Prefix extends string = '',
> = keyof DefineModules extends never
  ? string
  : T extends Dictionary
  ? {
      [K in keyof T]:
        | `${Prefix}${K & string}`
        | ConcatKeys<T[K], Separator, `${Prefix}${K & string}${Separator}`>
    }[keyof T]
  : never

export type TranslateParams<Global extends { t: unknown }> =
  Global['t'] extends (...params: infer Params) => unknown ? Params : never

export type Tail<A extends unknown[]> = A extends [unknown, ...infer Values]
  ? Values
  : []
