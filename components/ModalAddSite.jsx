import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../lib/auth';
import { createSite } from '../lib/db';

/**
 * Add a new site
 */
const ModalAddSite = () => {
  const auth = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit, watch, errors } = useForm();
  const toast = useToast({
    status: 'success',
    duration: 4000,
    isClosable: true,
    position: 'bottom-right',
  });

  const onSubmit = async (formData, event) => {
    console.log(formData);
    try {
      await createSite(formData, auth?.user);
      toast({
        title: `Success`,
        description: `Your new site "${formData.name}" has been created!`,
      });
      onClose();

    } catch (e) {
      console.error(e);
      toast({
        title: `Error`,
        description: e.message,
        status: 'error',
        duration: null, // Infinite
      });
    }
  };

  const onFailure = (data, e) => {
    console.log('failure', data, e);
  };

  return (
    <>
      <Button onClick={onOpen}>Add site</Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent
          as={'form'}
          onSubmit={handleSubmit(onSubmit, onFailure)}
        >
          <ModalHeader>Add site</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>
                <Input
                  name={'name'}
                  placeholder={'name'}
                  ref={register({ required: true })}
                />
              </FormLabel>
            </FormControl>

            <FormControl>
              <FormLabel>
                <Input
                  name={'url'}
                  placeholder={'url'}
                  ref={register({ required: true })}
                />
              </FormLabel>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              mr={3}
              onClick={onClose}
            >
              Close
            </Button>
            <Button
              type={'submit'}
              colorScheme="blue"
              variant="solid"
              size="md"
              mt={4}
              mb={4}
            >
              Add my first site
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalAddSite;
