import { Link as ChakraLink } from '@chakra-ui/react';
import { Fragment } from 'react';
import { useAuth } from '../lib/auth';
import ModalSignIn from './ModalSignIn';
import ModalSignUp from './ModalSignUp';
import NextLink from 'next/link'

const Nav = () => {
  const auth = useAuth();

  return (
    <nav>
      {
        auth?.user ? (
          <Fragment>
            <NextLink
              href="/dashboard"
            >
              Dashboard
            </NextLink>
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
