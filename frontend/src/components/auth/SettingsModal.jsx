import {
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  VStack,
} from "@chakra-ui/react";
import { Paintbrush, Paintbrush2, Settings2, User } from "lucide-react";
import React, { useRef, useState } from "react";

export const SettingsModal = ({
  setnewUserData,
  isOpen,
  setIsOpen,
  onSubmit,
}) => {
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const [newUserData, setNewUserData] = useState({
    username: "",
    email: "",
  });

  return (
    <Modal
      size="xl"
      isCentered
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      motionPreset={"slideInBottom"}
      onClose={() => setIsOpen(false)}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Account Settings</ModalHeader>
        <ModalCloseButton />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setNewUserData({ username: "", email: "" });
            onSubmit(newUserData);
          }}
        >
          <ModalBody pb={6}>
            <HStack
              alignItems="start"
              justifyContent="space-between"
              h="165px"
              gap={2}
            >
              <VStack justifyContent="flex-start">
                <IconButton colorScheme="brand" icon={<User />} />
                <IconButton
                  disabled
                  colorScheme="brand"
                  icon={<Paintbrush2 />}
                />
              </VStack>
              <Divider orientation="vertical" />
              <Stack gap={3} flex={1}>
                <FormControl>
                  <FormLabel>Change Username</FormLabel>
                  <Input
                    value={newUserData.username}
                    onChange={(e) =>
                      setNewUserData({
                        ...newUserData,
                        username: e.target.value,
                      })
                    }
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Change Email</FormLabel>
                  <Input
                    value={newUserData.email}
                    onChange={(e) =>
                      setNewUserData({ ...newUserData, email: e.target.value })
                    }
                  />
                </FormControl>
              </Stack>
            </HStack>
          </ModalBody>
          <ModalFooter>
            <HStack>
              <Button
                colorScheme="brand"
                onClick={() => {
                  setIsOpen(false);
                  setNewUserData({ username: "", email: "" });
                }}
                variant="ghost"
                size="sm"
              >
                Cancel
              </Button>
              <Button type="submit" colorScheme="brand" size="sm">
                Save Changes
              </Button>
            </HStack>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};
