
export type FactoryReturn<T> = (e: T) => void
export type Factory<O, T> = (options: O) => FactoryReturn<T>

