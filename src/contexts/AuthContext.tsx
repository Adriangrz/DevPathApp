import React, {
  useCallback,
  useEffect,
  createContext,
  ReactNode,
  useContext,
  useState,
} from 'react';

import {getItem, removeItem, storeItem} from '../utilities/asyncStorage';

type Props = {
  children: ReactNode;
};

export interface AuthContextInterface {
  setCredentials: (emailValue?: string) => void;
  logOut: () => void;
  email: string | null;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextInterface>({
  setCredentials() {
    return;
  },
  logOut() {
    return;
  },
  email: null,
  isLoading: true,
});

export const AuthContextProvider = ({children}: Props) => {
  const [email, setEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const asyncEffect = async () => {
      const emailValue = await getItem('email');
      if (emailValue) {
        setEmail(emailValue);
      }
      setIsLoading(false);
    };
    asyncEffect();
  }, []);

  const setCredentials = useCallback((emailValue?: string) => {
    if (emailValue) {
      setEmail(emailValue);
      storeItem('email', emailValue);
    }
  }, []);

  const logOut = useCallback(() => {
    if (email) {
      setEmail(null);
      removeItem('email');
    }
  }, [email]);

  return (
    <AuthContext.Provider value={{email, isLoading, setCredentials, logOut}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
