import { Fragment } from 'react';
import { useAuth } from '../lib/auth';
import ModalSignIn from './ModalSignIn';
import ModalSignUp from './ModalSignUp';

const Nav = () => {
  const auth = useAuth();

  return (
    <nav>
      {
        auth?.user ? (
          <Fragment>
            Dashboard
          </Fragment>
        ) : (
          <Fragment>
            <ModalSignIn />
            <ModalSignUp />
          </Fragment>
        )
      }
    </nav>
  );
};

export default Nav;
