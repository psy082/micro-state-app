/* eslint-disable  @typescript-eslint/no-explicit-any */

import { useReducer } from "react";

const reducer = <State,>(prevState: State, action: any) => {
  return typeof action === "function" ? action(prevState) : action;
};

const useReducerState = () => {
  const initialState = null; // Replace null with the desired initial state
  const [state, dispatch] = useReducer(reducer, initialState);
  // Add your custom logic here

  return [state, dispatch];
};

export default useReducerState;
