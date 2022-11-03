import React from "react";
import {
  Box,
  Button,
  Center,
  Divider,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const Explore = () => {
  return (
    <Center>
      <Box
        maxW="3xl"
        p={7}
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
      >
        <Stack>
          <Text fontSize="4xl" fontWeight="bold">
            Howdy!
          </Text>
          <Text>
            This is a little awkward, but you must have an account to see posts.
            Luckily we've made the process easy.
          </Text>
          <Divider />
          <HStack paddingTop={3}>
            <Button variant="solid" colorScheme="brand">
              Sign In
            </Button>
            <Link to="/auth/register">
              <Button
                variant="ghost"
                rightIcon={<ArrowRight />}
                colorScheme="brand"
              >
                Register
              </Button>
            </Link>
          </HStack>
        </Stack>
      </Box>
    </Center>
  );
};
