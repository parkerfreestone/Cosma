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
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { Check, Cog, Edit, UserPlus, X } from "lucide-react";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SettingsModal } from "../components/auth/SettingsModal";
import { PostCard } from "../components/profile/PostCard";
import { useAuthContext } from "../context/UserContext";

export const Profile = () => {
  const [userData, setUserData] = useState({});
  const [postData, setPostData] = useState([]);
  const [editingBio, setEditingBio] = useState(false);
  const [settingsIsOpen, setSettingsIsOpen] = useState(false);

  const { userId } = useAuthContext();
  const { id } = useParams();

  const toast = useToast();

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetch(`/api/users/${id}`, {
        method: "GET",
      })
        .then((userJsonCollection) => userJsonCollection.json())
        .then((res) => setUserData(res));
    }
  }, [id]);

  useEffect(() => {
    fetch(`/api/posts/${id}`, {
      method: "GET",
    })
      .then((postJsonCollection) => postJsonCollection.json())
      .then((res) => setPostData(res));
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
      navigate(0);
    });
  };

  const handleFollowRequest = () => {
    fetch(`/api/users/${id}/followers`, {
      method: "POST",
    }).then((res) => {
      toast({
        title: res.status === 200 ? "Follow Success." : "Uh oh...",
        description:
          res.status === 200
            ? "Hmm, hopefully something good comes of this!"
            : "There was a problem following this user. Try again later.",
        status: res.status === 200 ? "success" : "error",
        duration: 4000,
        isClosable: true,
      });
      navigate(0);
    });
  };

  return (
    <Flex direction="column" alignItems="center">
      <Box maxW="3xl" w="100%" borderWidth="1px" borderRadius="lg" p={6}>
        <Flex alignItems="center" justifyContent="start">
          <Avatar
            size="xl"
            colorScheme="brand"
            marginEnd={6}
            name={userData?.username}
          />
          <Flex>
            <Stack marginBottom={5}>
              <Heading size="lg">{userData?.username}</Heading>
              <Heading size="sm" color="gray.600" style={{ marginTop: 0 }}>
                Joined {new Date(userData?.createdDate).toLocaleDateString()}
              </Heading>
            </Stack>
            {/* <HStack>
              <Heading size="lg">{userData?.following.length}</Heading>
              <Heading size="lg">{userData?.follower.length}</Heading>
            </HStack> */}
          </Flex>
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
                  : handleEditUserProfile(userData && "");
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
        ) : (
          <Button
            size="md"
            colorScheme="brand"
            leftIcon={<UserPlus />}
            my={5}
            onClick={handleFollowRequest}
          >
            Follow User
          </Button>
        )}
        {userData?.bio && !editingBio ? (
          <Text>{userData.bio}</Text>
        ) : (
          <>
            {!editingBio && userId === id ? (
              <Text marginTop={2} color={!userData?.bio ? "gray.500" : "black"}>
                Psst! It seems like you don't have a bio, you should make one.
              </Text>
            ) : (
              userId === id && (
                <Textarea
                  resize={"none"}
                  value={userData?.bio || ""}
                  onChange={(e) =>
                    setUserData((existingValues) => ({
                      ...existingValues,
                      bio: e.target.value,
                    }))
                  }
                />
              )
            )}
          </>
        )}
      </Box>
      <Box maxW="3xl" w="100%" mt={5}>
        <Tabs variant="soft-rounded" colorScheme="purple">
          <TabList>
            <Tab>Posts</Tab>
            <Tab isDisabled>Tagged</Tab>
            <Tab isDisabled>Liked</Tab>
          </TabList>
          <TabPanels>
            <TabPanel px={0}>
              <Stack gap={2}>
                {postData.map(({ user, content, createdDate }) => (
                  <PostCard
                    key={user.id}
                    user={user}
                    content={content}
                    createdDate={createdDate}
                  />
                ))}
              </Stack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
      <SettingsModal
        isOpen={settingsIsOpen}
        setIsOpen={setSettingsIsOpen}
        setUserData={setUserData}
        onSubmit={handleEditUserProfile}
      />
    </Flex>
  );
};
