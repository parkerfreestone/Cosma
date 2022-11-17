import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  Edit,
  Heart,
  MessageCircle,
  MoreVertical,
  Pencil,
  Trash,
} from "lucide-react";
import React from "react";
import { useAuthContext } from "../../context/UserContext";

const iconSize = 18;

export const PostCard = ({ user, content, createdDate, comments, likes }) => {
  const { userId } = useAuthContext();
  const isAuthedUser = user.id === userId;

  return (
    <Box maxW="3xl" w="100%" borderWidth="1px" borderRadius="lg" p={6}>
      <HStack alignItems="flex-start">
        <Avatar size="md" name={user.username} />
        <Stack>
          <Heading size="md">{user.username}</Heading>
          <Heading size="xs" color="gray.600" style={{ marginTop: 0 }}>
            {new Date(createdDate).toLocaleDateString()}
          </Heading>
          <Text>{content.toLowerCase()}</Text>
        </Stack>
      </HStack>
      <Flex alignItems="center" justifyContent="flex-end">
        <Button
          size="sm"
          leftIcon={<MessageCircle size={iconSize} />}
          variant="ghost"
          colorScheme="brand"
        >
          0
        </Button>
        {/* <Button
          size="sm"
          leftIcon={<Heart size={iconSize} />}
          variant="ghost"
          colorScheme="brand"
        >
          5
        </Button> */}
        {isAuthedUser ? (
          <Menu>
            <MenuButton
              as={IconButton}
              variant="ghost"
              size="sm"
              colorScheme="brand"
              icon={<MoreVertical size={iconSize} />}
            />
            <MenuList>
              <MenuItem icon={<Edit size={iconSize} />}>Edit</MenuItem>
              <MenuItem icon={<Trash size={iconSize} />}>Delete</MenuItem>
            </MenuList>
          </Menu>
        ) : null}
      </Flex>
    </Box>
  );
};
