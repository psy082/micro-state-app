import { createContext, useContext, useRef, useSyncExternalStore, type ReactNode } from "react";
import createStore, { type Store } from "../util/createStore";

type State = object; // Add a type declaration for the State variable

const StoreContext = createContext<Store<State>>(
  createStore<State>({ count: 0, text: "hello" })
);

const StoreProvider = ({
  initialState,
  children,
}: {
  initialState: State;
  children: ReactNode;
}) => {
  const storeRef = useRef<Store<State>>();
  if (!storeRef.current) {
    storeRef.current = createStore<State>(initialState);
  }

  return (
    <StoreContext.Provider value={storeRef.current}>
      {children}
    </StoreContext.Provider>
  );
};


const useSelector = <S>(selector: (state: State) => S): S => {
  const store = useContext(StoreContext);
  return useSyncExternalStore(
    store.subscribe,
    () => selector(store.getState()),
    () => selector(store.getState())
  );
}