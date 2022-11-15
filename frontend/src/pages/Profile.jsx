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
import { Check, Cog, Edit, X } from "lucide-react";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { SettingsModal } from "../components/auth/SettingsModal";
import { useAuthContext } from "../context/UserContext";

export const Profile = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    bio: "",
  });
  const [editingBio, setEditingBio] = useState(false);
  const [settingsIsOpen, setSettingsIsOpen] = useState(false);

  const { userId } = useAuthContext();
  const { id } = useParams();

  const toast = useToast();

  useEffect(() => {
    if (id) {
      fetch(`/api/users/${id}`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((profileJsonPayload) => setUserData(profileJsonPayload))
        .catch(() => alert("There was an error fetching your profile..."));
    }
  }, [id]);

  const handleEditUserProfile = (data) => {
    setEditingBio(false);

    data = Object.fromEntries(Object.entries(data).filter(([_, v]) => v != ""));

    fetch(`/api/users/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
    }).then((res) => {
      toast({
        title: res.status === 200 ? "Account Changed." : "Uh oh...",
        description:
          res.status === 200
            ? "We've successfully updated your account."
            : "There was a problem updating your account. It's likely that username or email is already taken.",
        status: res.status === 200 ? "success" : "error",
        duration: 4000,
        isClosable: true,
      });
    });
  };

  return (
    <>
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
          {id === userId ? (
            <HStack marginY={5}>
              <Button
                leftIcon={<Cog />}
                size="sm"
                onClick={() => setSettingsIsOpen(true)}
              >
                Settings
              </Button>
              <Button
                leftIcon={!editingBio ? <Edit /> : <Check />}
                size="sm"
                onClick={() => {
                  !editingBio
                    ? setEditingBio(!editingBio)
                    : handleEditUserProfile(userData);
                }}
                colorScheme={!editingBio ? "gray" : "green"}
              >
                {!editingBio ? "Edit Bio" : "Save Changes"}
              </Button>
              {!editingBio ? null : (
                <Button
                  colorScheme="red"
                  onClick={() => setEditingBio(!editingBio)}
                  leftIcon={<X />}
                  size="sm"
                >
                  Cancel
                </Button>
              )}
            </HStack>
          ) : null}
          {userData.bio && !editingBio ? (
            <Text>{userData.bio}</Text>
          ) : (
            <>
              {!editingBio ? (
                <Text
                  marginTop={2}
                  color={!userData.bio ? "gray.500" : "black"}
                >
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

      <SettingsModal
        isOpen={settingsIsOpen}
        setIsOpen={setSettingsIsOpen}
        setUserData={setUserData}
        onSubmit={handleEditUserProfile}
      />
    </>
  );
};
