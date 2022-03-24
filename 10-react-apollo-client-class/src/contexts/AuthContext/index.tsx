import React from "react";
import { State, Action, reducer } from "./reducer";

interface ContextType {
  state: State;
  handleStateTrue(): void;
}

const Context = React.createContext({} as ContextType);

export const AuthContext = Context;

type AuthProviderPropType = { children: React.ReactNode };

export function AuthProvider(props: AuthProviderPropType) {
  const { children } = props;
  const [state, dispatch] = React.useReducer(reducer, { value: false });

  const handleStateTrue = () => {
    dispatch({ type: "SET_TRUE" });
  };

  return (
    <Context.Provider value={{ state, handleStateTrue }}>
      {children}
    </Context.Provider>
  );
}

export const useAuth = () => React.useContext(Context);
