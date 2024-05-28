import { Box, Container, Flex, Heading, Text, VStack, HStack, Link, Spacer, Button, Spinner, Alert, AlertIcon } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

import { useEvents, useAddEvent, useDeleteEvent } from "../integrations/supabase/index.js";

const Index = () => {
  const { data: events, error, isLoading } = useEvents();
  const addEventMutation = useAddEvent();
  const deleteEventMutation = useDeleteEvent();

  const handleAddEvent = () => {
    addEventMutation.mutate({ name: "New Event", date: new Date().toISOString(), description: "Description", venue_id: 1 });
  };

  const handleDeleteEvent = (eventId) => {
    deleteEventMutation.mutate(eventId);
  };
  return (
    <Box>
      <Flex as="nav" bg="blue.500" color="white" padding={4}>
        <HStack spacing={8}>
          <Heading size="md">OpenCanvas</Heading>
          <Link as={RouterLink} to="/" _hover={{ textDecoration: "none" }} fontWeight="bold">
            Home
          </Link>
          <Link as={RouterLink} to="/about" _hover={{ textDecoration: "none" }} fontWeight="bold">
            About
          </Link>
          <Link as={RouterLink} to="/contact" _hover={{ textDecoration: "none" }} fontWeight="bold">
            Contact
          </Link>
        </HStack>
        <Spacer />
      </Flex>
      <Container centerContent maxW="container.md" height="calc(100vh - 64px)" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <VStack spacing={4}>
          <Heading fontSize="4xl">Welcome to OpenCanvas</Heading>
          <Text fontSize="xl">Your Blank Canvas for Creativity</Text>
        <Button onClick={handleAddEvent} colorScheme="blue">Add Event</Button>
          {isLoading && <Spinner />}
          {error && (
            <Alert status="error">
              <AlertIcon />
              {error.message}
            </Alert>
          )}
          {events && events.map(event => (
            <Box key={event.id} p={4} shadow="md" borderWidth="1px">
              <Heading fontSize="xl">{event.name}</Heading>
              <Text mt={4}>{event.description}</Text>
              <Button mt={4} colorScheme="red" onClick={() => handleDeleteEvent(event.id)}>Delete</Button>
            </Box>
          ))}
        </VStack>
      </Container>
    </Box>
  );
};

export default Index;