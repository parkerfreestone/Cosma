import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
} from "@chakra-ui/react";
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
            <Stack gap={3}>
              <FormControl>
                <FormLabel>Change Username</FormLabel>
                <Input
                  value={newUserData.username}
                  onChange={(e) =>
                    setNewUserData({ ...newUserData, username: e.target.value })
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
