// Shared code with stuff that is not exported to the user

/**
 * @description Create a getter/setter, where the getter defaults to memoizing a thunk
 */
export function replaceableThunk<T>(thunk: () => T): [() => T, (val: T) => void] {
  let called = false;
  let res: T | null  = null;
  function get(): T {
    if (!called) {
      called = true;
      res = thunk();
    }
    return res as T;
  }
  function set(val: T): void {
    if (called) {
      throw Error(`Cannot re-set value once already set`);
    }
    res = val;
    called = true;
  }
  return [get, set];
}

/**
 * @description Only perform side effects from thunk on the first call.
 */
export function memoizeThunk<T>(thunk: () => T): () => T {
  return replaceableThunk(thunk)[0];
}
