import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  Heading,
  HStack,
  Stack,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { Cog, Edit } from "lucide-react";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useAuthContext } from "../context/UserContext";

export const Profile = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    bio: "",
  });
  const [editingBio, setEditingBio] = useState(false);

  const { userId } = useAuthContext();

  const toast = useToast();

  useEffect(() => {
    if (userId) {
      fetch(`/api/users/${userId}`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((profileJsonPayload) => setUserData(profileJsonPayload))
        .catch(() => alert("There was an error fetching your profile..."));
    }
  }, [userId]);

  const handleEditUserProfile = () => {
    console.log(userData);
    fetch(`/api/users/profile/${userId}`, {
      method: "PUT",
      body: JSON.stringify(userData),
    }).then(() =>
      toast({
        title: "Account Successfully Changed.",
        description: "We've changed those field you requested!",
        status: "success",
        duration: 4000,
        isClosable: true,
      })
    );
  };

  return (
    <Center>
      <Box maxW="3xl" w="100%" borderWidth="1px" borderRadius="lg" p={6}>
        <Flex alignItems="center" justifyContent="start">
          <Avatar
            size="xl"
            colorScheme="brand"
            marginEnd={6}
            name={userData?.username}
          />
          <Stack marginBottom={5}>
            <Heading size="lg">{userData?.username}</Heading>
            <Heading size="sm" color="gray.600">
              Joined {new Date(userData.createdDate).toDateString()}
            </Heading>
          </Stack>
        </Flex>
        <HStack marginY={5}>
          <Button leftIcon={<Cog />} size="sm">
            Settings
          </Button>
          <Button
            leftIcon={<Edit />}
            size="sm"
            onClick={() => {
              !editingBio
                ? setEditingBio(!editingBio)
                : handleEditUserProfile();
            }}
            colorScheme={!editingBio ? "gray" : "brand"}
          >
            {!editingBio ? "Edit Bio" : "I'm done now"}
          </Button>
        </HStack>
        {userData.bio && !editingBio ? (
          userData.bio
        ) : (
          <>
            {!editingBio ? (
              <Text color={!userData.bio ? "gray.500" : "black"}>
                Psst! It seems like you don't have a bio, you should make one.
              </Text>
            ) : (
              <Textarea
                resize={"none"}
                value={userData.bio || ""}
                onChange={(e) =>
                  setUserData((existingValues) => ({
                    ...existingValues,
                    bio: e.target.value,
                  }))
                }
              />
            )}
          </>
        )}
      </Box>
    </Center>
  );
};
