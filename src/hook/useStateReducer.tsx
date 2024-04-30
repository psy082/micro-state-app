import { useState } from "react";

export const useStateReducer = <Action, State>(initialState: State) => {
  const [state, setState] = useState(initialState);

  const dispatch = (action: Action) => {
    setState((prevState) => {
      if (typeof action === "function") {
        return action(prevState);
      }
      return { ...prevState, ...action };
    });
  };

  return [state, dispatch];
};
