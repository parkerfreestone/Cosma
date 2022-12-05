import React, { useState } from "react";
import {
  Box,
  Button,
  Heading,
  HStack,
  Stack,
  Avatar,
  Text,
  Center,
  Link,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";

export const Explore = () => {
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    fetch("/api/users", { method: "GET" })
      .then((usersJsonPayload) => usersJsonPayload.json())
      .then((users) => setUsersList(users));
  }, []);

  return (
    <Center>
      <Stack maxW="3xl" width="100%">
        {usersList.map(({ id, username, createdDate }) => (
          <Box
            p={7}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            w="100%"
            key={id}
          >
            <HStack>
              <Avatar size="md" colorScheme="brand" name={username} />
              <Stack>
                <Heading size="md">{username}</Heading>
                <Text color="gray.500" style={{ marginTop: 0 }}>
                  Joined {new Date(createdDate).toLocaleDateString()}
                </Text>
              </Stack>
            </HStack>
            <Link as={RouterLink} to={`/profile/${id}`}>
              <Button
                rightIcon={<ArrowRight />}
                size="sm"
                marginTop={2}
                variant="ghost"
              >
                View Profile
              </Button>
            </Link>
          </Box>
        ))}
      </Stack>
    </Center>
  );
};
