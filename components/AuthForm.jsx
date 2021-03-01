import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Button, Center, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import React from 'react';

const AuthForm = (props) => {
  const { confirmPassword = false } = props;

  return (
    <div className={'auth-form'}>
      <Center mt="25px" mb="25px">
        <FormControl isRequired maxWidth="50%">
          <FormLabel>Email</FormLabel>
          <Input placeholder="Email address" />
          <FormErrorMessage>Error message</FormErrorMessage>
        </FormControl>
      </Center>

      <Center mb="25px" mt="25px">
        <FormControl isRequired maxWidth="50%">
          <FormLabel>Password</FormLabel>
          <Input
            type={'password'}
            placeholder="Awesome password"
          />
          <FormErrorMessage>Error message</FormErrorMessage>
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

      <Center mb="25px" mt="25px">
        <Button
          variant="solid"
          size="md"
          colorScheme="telegram"
          rightIcon={<ArrowForwardIcon />}
        >
          Submit
        </Button>
      </Center>
    </div>
  );
};

export default AuthForm;
