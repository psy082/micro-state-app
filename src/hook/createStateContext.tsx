/* eslint-disable  @typescript-eslint/no-explicit-any */

import { createContext, useContext, ReactNode } from "react";

const createStateContext = <Value, State>(
  useValue: (init?: Value) => State
) => {
  const StateContext = createContext<State | null>(null);
  const StateProvider = ({
    initialValue,
    children,
  }: {
    initialValue?: Value;
    children?: ReactNode;
  }) => {
    const value = useValue(initialValue);
    return (
      <StateContext.Provider value={value}>{children}</StateContext.Provider>
    );
  };
  const useContextState = () => {
    const value = useContext(StateContext);
    if (value === null) {
      throw new Error("useContextState must be used within a StateProvider");
    }
    return value;
  };
  return [StateProvider, useContextState] as const;
};

export default createStateContext;
