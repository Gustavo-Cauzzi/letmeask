import firebase from "firebase";
import { createContext, ReactNode, useEffect, useState } from "react";
import { auth } from "../services/firebase";

interface IUser {
  id: string;
  name: string;
  avatar: string;
}

interface AuthContextType {
  user?: IUser;
  signInWithGoogle: () => Promise<void>;
}

type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider ({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<IUser>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const { displayName, photoURL, uid } = user;

        if(!displayName || !photoURL) {
          throw new Error('Missing information from Google account.');
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
        })
      }
    });

    return () => {
      unsubscribe();
    }
  }, []);

  async function signInWithGoogle(){
    const provider = new firebase.auth.GoogleAuthProvider();

    const response = await auth.signInWithPopup(provider);

    if (response.user) {
      const { displayName, photoURL, uid } = response.user;

      if(!displayName || !photoURL) {
        throw new Error('Missing information from Google account.');
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL,
      })
    }
  }

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  )
}

// export default useAuth;
