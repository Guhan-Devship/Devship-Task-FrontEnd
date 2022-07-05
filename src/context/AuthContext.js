import { createContext, useEffect, useReducer } from "react";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(INITIAL_STATE);
  
    useEffect(() => {
      localStorage.setItem("user", JSON.stringify(state.user));
      console.log(state.user)
    }, [state.user]);
    return (
        <AuthContext.Provider
          value={{
            user: state.user,
          }}
        >
          {children}
        </AuthContext.Provider>
      );
}