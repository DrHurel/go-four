
export type FactoryReturn<T, R> = (e: T) => R | Promise<R>
export type Factory<O, T, R> = (options: O) => FactoryReturn<T, R>

