import { Box, Container, Flex, Heading, Text, VStack, HStack, Link, Spacer } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Index = () => {
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
        </VStack>
      </Container>
    </Box>
  );
};

export default Index;