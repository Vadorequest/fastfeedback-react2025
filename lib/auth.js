import React, { useState, useEffect, useContext, createContext } from 'react';
import firebase from './firebase';

const authContext = createContext();

// Provider react => Transmet des données à tous ses descendants
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook (useXXX) sert à accéder et modifier de la donnée
export const useAuth = () => {
  // Context react, c'est un store particulier intégré à react
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const createFakeUser = () => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword('ambroise.dhenain+fake@gmail.com', 'aaaaaa')
      .then((response) => {
        console.log('response', response)
        return response.user;
      });
  };

  const signinWithGithub = () => {
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GithubAuthProvider())
      .then((response) => {
        setUser(response.user);
        return response.user;
      });
  };

  const signinWithEmailPassword = (email, password) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        setUser(response.user);
        return response.user;
      });
  };

  const signout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(false);
      });
  };

  // Effect react, côté navigateur uniquement
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return {
    user,
    createFakeUser,
    signinWithGithub,
    signinWithEmailPassword,
    signout
  };
}
