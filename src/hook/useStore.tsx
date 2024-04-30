/* eslint-disable  @typescript-eslint/no-explicit-any */

import { useState, useEffect } from "react";
import { type Store } from "../util/createStore";

// 애초에 store를 인자로 받는 것 부터가 nonsense가 아닐까?
// store에 직접 접근이 이미 가능한데,
// store 자체에 접근이 불가능 하도록 만들어야 하지 않을까?

const useStore = (store: Store<any>) => {
  const [state, setState] = useState(store.getState());

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setState(store.getState());
    });
    setState(store.getState());
    return unsubscribe;
  }, [store]);

  return [state, store.setState];
};

export default useStore;
