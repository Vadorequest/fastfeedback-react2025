import Cookies from 'js-cookie';
import React, { createContext, useContext, useEffect, useState } from 'react';
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

  const createUser = (email, password) => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        console.log('response', response);
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
    // Firebase automatically authenticates the user, by using the browser IndexedDB
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);

        // Create cookie to know who the current authenticated user is (e.g: from server)
        // XXX This is not secure, don't do it in prod apps
        Cookies.set('user', JSON.stringify({
          id: user?.uid,
          email: user?.email,
        }));
      } else {
        setUser(false);
        Cookies.remove('user');
      }
    });

    return () => unsubscribe();
  }, []);

  return {
    user,
    createUser,
    signinWithGithub,
    signinWithEmailPassword,
    signout,
  };
}
