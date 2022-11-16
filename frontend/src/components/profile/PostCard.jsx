import {
  Avatar,
  Box,
  Divider,
  Heading,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";

export const PostCard = ({ user, content, createdDate }) => {
  return (
    <Box maxW="3xl" w="100%" borderWidth="1px" borderRadius="lg" p={6}>
      <Stack>
        <HStack>
          <Avatar size="md" name={user} />
          <Stack>
            <Heading size="md">{user}</Heading>
            <Heading size="xs" color="gray.600" style={{ marginTop: 0 }}>
              {new Date(createdDate).toLocaleDateString()}
            </Heading>
          </Stack>
        </HStack>
        <Divider />
        <Text>{content}</Text>
      </Stack>
    </Box>
  );
};
