
export type FactoryReturn<T> = (e: T) => void | Promise<void>
export type Factory<O, T> = (options: O) => FactoryReturn<T>

