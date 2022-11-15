import {
  Button,
  Divider,
  FormControl,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { ArrowRight, Share } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/UserContext";

export const NewPostModal = ({ isOpen, setIsOpen }) => {
  const [postContent, setPostContent] = useState("");

  const { signedIn } = useAuthContext();

  const toast = useToast();

  const handleSubmit = async () => {
    fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: postContent }),
    }).then((res) => {
      console.log(res);
      toast({
        title: res.ok ? "Nice!" : "Uh oh...",
        description: res.ok
          ? "Super poggers, maybe this post will go viral 😎"
          : "There was a problem submitting your post. Try again later.",
        status: res.ok ? "success" : "error",
        duration: 4000,
        isClosable: true,
      });
      setIsOpen(false);
    });
  };

  return (
    <Modal
      isCentered
      isOpen={isOpen}
      motionPreset={"slideInBottom"}
      onClose={() => setIsOpen(false)}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <HStack>
            <Share color="gray" />
            <Text>Create A New Post</Text>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        {signedIn ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();

              handleSubmit();
              setPostContent("");
            }}
          >
            <ModalBody pb={3}>
              <FormControl>
                <Textarea
                  variant="filled"
                  value={postContent}
                  resize="none"
                  placeholder="What's on your mind?"
                  onChange={(e) => setPostContent(e.target.value)}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <HStack>
                <Button
                  colorScheme="brand"
                  onClick={() => {
                    setIsOpen(false);
                  }}
                  variant="ghost"
                  size="sm"
                >
                  Cancel
                </Button>
                <Button type="submit" colorScheme="brand" size="sm">
                  Share
                </Button>
              </HStack>
            </ModalFooter>
          </form>
        ) : (
          <>
            <ModalBody>
              <Text>This is awkward... you must be signed in to post!</Text>
            </ModalBody>
            <ModalFooter>
              <HStack>
                <Link>
                  <Button size="sm" colorScheme="brand" variant="solid">
                    Log In
                  </Button>
                </Link>

                <Link>
                  <Button
                    size="sm"
                    colorScheme="brand"
                    variant="ghost"
                    rightIcon={<ArrowRight />}
                  >
                    Register
                  </Button>
                </Link>
              </HStack>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
