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
} from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { createSite } from '../lib/db';

/**
 * Add a new site
 */
const ModalAddSite = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit, watch, errors } = useForm();

  const onSubmit = async (formData, event) => {
    console.log(formData);
      const x = await createSite(formData.name, formData.url);
      console.log('x', x);
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
