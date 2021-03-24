import { Button } from '@chakra-ui/react';
import NextLink from 'next/link';
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
            <NextLink
              href="/dashboard"
            >
              <Button
                variant={'solid'}
                colorScheme="pink"
              >
                Dashboard
              </Button>
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
