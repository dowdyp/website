declare const __brand: unique symbol;

export type Brand<V, B> = V & {
    [__brand]: B
}