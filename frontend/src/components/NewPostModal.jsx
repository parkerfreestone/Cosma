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
import { Share } from "lucide-react";
import React, { useState } from "react";

export const NewPostModal = ({ isOpen, setIsOpen }) => {
  const [postContent, setPostContent] = useState("");

  const toast = useToast();

  const handleSubmit = async () => {
    fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: postContent }),
    }).then((res) => {
      toast({
        title: res.status == 200 ? "Nice!" : "Uh oh...",
        description:
          res.status == 200
            ? "Super poggers, maybe this post will go viral 😎"
            : "There was a problem submitting your post. Try again later.",
        status: res.status == 200 ? "success" : "error",
        duration: 4000,
        isClosable: true,
      });
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
        <form
          onSubmit={(e) => {
            e.preventDefault();

            handleSubmit();
            setPostContent("");
          }}
        >
          <ModalBody pb={6}>
            <FormControl>
              <Textarea
                value={postContent}
                resize="none"
                placeholder="What's on your mind?"
                onChange={(e) => setPostContent(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <Divider />
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
      </ModalContent>
    </Modal>
  );
};
