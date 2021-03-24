import { MoonIcon } from '@chakra-ui/icons';
import { Avatar, Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Container, Flex, Heading, Link, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import ModalAddSite from '../../components/ModalAddSite';
import { useAuth } from '../../lib/auth';

const Dashboard = () => {
  const auth = useAuth();
  console.log('auth', auth)

  if(!auth.user){
    // Not connected
    return (
      <div>
        Fuck off.
      </div>
    )
  }

  return (
    <Box
      as={'main'}
      backgroundColor="gray.50"
      minH={'98vh'}
    >
      <Flex
        backgroundColor="white"
        justifyContent="space-between"
        mt={4}
        mb={4}
        ml={2}
        mr={2}
        pt={2}
        pb={2}
      >
        <Box
        >
          <Stack
            spacing={2}
            alignItems="center"
            justifyContent="flex-start"
            isInline
          >
            <MoonIcon />
            <Link>Sites</Link>
            <Link>Feedback</Link>
          </Stack>
        </Box>
        <Box>
          <Stack
            spacing={2}
            isInline
            alignItems="center"
            justifyContent="flex-start"
          >
            <Link>Account</Link>
            <Avatar size="xs" />
          </Stack>
        </Box>
      </Flex>

      <Flex
        alignItems="center"
        justifyContent="center"
      >
        <Flex
          justifyContent="center"
          alignItems="center"
          mt={8}
          mb={8}
        >
          <Container display="block" overflow="visible" minWidth="90vw">
            <Flex flexDirection="column">
              <Breadcrumb>
                <BreadcrumbItem>
                  <BreadcrumbLink>Sites</BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>
              <Box>
                <Heading size="lg">My Fracking Sites</Heading>
              </Box>
              <Flex
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
                backgroundColor="white"
                mt={4}
                mb={4}
                pl={4}
                pr={4}
                pt={4}
                pb={4}
              >
                <Box>
                  <Heading as="h2" size="sm">
                    You don't have any site yet!
                  </Heading>
                </Box>
                <Text mt={2} mb={2}>
                  Nothing easier! Just add one :)
                </Text>
                <ModalAddSite />
              </Flex>
            </Flex>
          </Container>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Dashboard;
