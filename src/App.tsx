import { useCallback } from "react";
import createStore from "./util/createStore";
import useStoreSelector from "./hook/useStoreSelector";

type CountState = { count1: number; count2: number };
const store = createStore<CountState>({ count1: 0, count2: 0 });

const Component1 = () => {
  const state = useStoreSelector(
    store,
    useCallback((state: CountState) => state.count1, [])
  );

  const inc = () => {
    store.setState((prev: CountState) => ({
      ...prev,
      count1: prev.count1 + 1,
    }));
  };

  return (
    <div>
      count1: {state} <button onClick={inc}>+1</button>
    </div>
  );
};

const Component2 = () => {
  const state = useStoreSelector(
    store,
    useCallback((state: CountState) => state.count2, [])
  );

  const inc = () => {
    store.setState((prev: CountState) => ({
      ...prev,
      count2: prev.count2 + 1,
    }));
  };

  return (
    <div>
      count2: {state} <button onClick={inc}>+1</button>
    </div>
  );
};

function App() {
  return (
    <>
      <Component1 />
      <Component1 />
      <Component2 />
      <Component2 />
    </>
  );
}

export default App;
