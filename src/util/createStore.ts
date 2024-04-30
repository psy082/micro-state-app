export type Store<T> = {
    getState: () => T,
    setState: (action: T | ((prevState: T) => T)) => void,
    subscribe: (listener: () => void) => () => void
}

const createStore = <T>(initialState: T): Store<T> => {
    let state = initialState;
    const listeners = new Set<() => void>();

    const getState = () => state;

    const setState = (nextState: T | ((prevState: T) => T)) => {
        state = typeof nextState === "function" ? (nextState as (prev: T) => T)(state) : nextState;
        listeners.forEach((listener) => listener());
    };

    const subscribe = (listener: () => void) => {
        listeners.add(listener);
        return () => {
            listeners.delete(listener);
        };
    };

    return { getState, setState, subscribe };
};

export default createStore;