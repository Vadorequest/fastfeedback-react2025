import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Button, Center, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useAuth } from '../lib/auth';

const AuthForm = (props) => {
  const {
    confirmPassword = false,
    closeModal,
  } = props;
  const [email, setEmail] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [loginError, setLoginError] = useState(undefined);
  const auth = useAuth();

  const onSubmit = async (event) => {
    try {
      const result = await auth.signinWithEmailPassword(email, password);
      console.log('result', result);
      setLoginError(undefined);
      closeModal();

    } catch (e) {
      setLoginError(e);
    }
  };

  return (
    <div className={'auth-form'}>
      <Center mt="25px" mb="25px">
        <FormControl isRequired maxWidth="50%">
          <FormLabel>Email</FormLabel>
          <Input
            placeholder="Email address"
            onChange={(event) => setEmail(event.target.value)}
          />
        </FormControl>
      </Center>

      <Center mb="25px" mt="25px">
        <FormControl isRequired maxWidth="50%">
          <FormLabel>Password</FormLabel>
          <Input
            type={'password'}
            placeholder="Awesome password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </FormControl>
      </Center>

      {
        confirmPassword && (
          <Center mb="25px" mt="25px">
            <FormControl isRequired maxWidth="50%">
              <FormLabel>Confirm password</FormLabel>
              <Input
                type={'password'}
                placeholder="Awesome password"
              />
              <FormErrorMessage>Error message</FormErrorMessage>
            </FormControl>
          </Center>
        )
      }

      {
        loginError && (
          <div>{loginError?.message}</div>
        )
      }

      <Center mb="25px" mt="25px">
        <Button
          variant="solid"
          size="md"
          colorScheme="telegram"
          rightIcon={<ArrowForwardIcon />}
          onClick={onSubmit}
        >
          Submit
        </Button>
      </Center>
    </div>
  );
};

export default AuthForm;
