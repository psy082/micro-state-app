import { useState, useEffect, useSyncExternalStore } from "react";
import { type Store } from "../util/createStore";

export const useStoreSelector2 = <T, S>(
  store: Store<T>,
  selector: (state: T) => S
): S => {
  const [state, setState] = useState(() => selector(store.getState()));

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setState(selector(store.getState()));
    });
    setState(selector(store.getState()));
    return unsubscribe;
  }, [store, selector]);

  return state;
};

const useStoreSelector = <T, S>(
  store: Store<T>,
  selector: (state: T) => S
): S => {
  const state = useSyncExternalStore(
    store.subscribe,
    () => selector(store.getState()),
    () => selector(store.getState())
  );
  return state;
};

export default useStoreSelector;
