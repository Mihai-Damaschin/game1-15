import { useState } from 'react';

type Optional<T extends object> = {
  [K in keyof T]?: T[K];
};

export const useStateHandlers = <T extends object>(
  initialState: T,
): [T, (newState: Optional<T> | ((prevState: T) => Optional<T>)) => void] => {
  const [state, setState] = useState<T>(initialState);

  const setNewState = (newState: Optional<T> | ((prevState: T) => Optional<T>)): void => {
    if (typeof newState === 'function') {
      setState((prevState) => ({ ...prevState, ...newState(prevState) }));
    } else {
      setState((prevState) => ({
        ...prevState,
        ...newState,
      }));
    }
  };

  return [state, setNewState];
};