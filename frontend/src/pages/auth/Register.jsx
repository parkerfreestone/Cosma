import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
} from "@chakra-ui/react";
import { Mail, User } from "lucide-react";
import { useMutation } from "@tanstack/react-query";

const createUser = (data) => {
  delete data?.confirmPassword;

  fetch("/api/v1/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user: data }),
  })
    .then((res) => res.json())
    .then((userDataPayload) => {
      console.log(userDataPayload);
      return userDataPayload;
    });
};

export const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [show, setShow] = useState({
    show1: false,
    show2: false,
  });

  const { mutate, isLoading } = useMutation(createUser, {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: () => {
      alert("There was an error creating your account.");
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        mutate(formData);
      }}
    >
      <Center>
        <Box maxW="3xl" w="100%" borderWidth="1px" borderRadius="lg" p={6}>
          <Stack gap={2}>
            <Heading size="lg">Register</Heading>

            <Divider />

            <FormControl isRequired>
              <FormLabel>Username</FormLabel>
              <InputGroup size="lg">
                <InputLeftElement
                  pointerEvents="none"
                  children={<User color="gray" />}
                />
                <Input
                  type="text"
                  variant="filled"
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                />
              </InputGroup>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <InputGroup size="lg">
                <InputLeftElement
                  pointerEvents="none"
                  children={<Mail color="gray" />}
                />
                <Input
                  type="email"
                  variant="filled"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </InputGroup>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup size="lg">
                <Input
                  type={show.show1 ? "text" : "password"}
                  pr="4.5rem"
                  variant="filled"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <InputRightElement width="4.5rem">
                  <Button
                    size="sm"
                    colorScheme="brand"
                    variant="ghost"
                    onClick={() => setShow({ ...show, show1: !show.show1 })}
                  >
                    {show.show1 ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Confirm Password</FormLabel>
              <InputGroup size="lg">
                <Input
                  type={show.show2 ? "text" : "password"}
                  pr="4.5rem"
                  variant="filled"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                />
                <InputRightElement width="4.5rem">
                  <Button
                    size="sm"
                    colorScheme="brand"
                    variant="ghost"
                    onClick={() => setShow({ ...show, show2: !show.show2 })}
                  >
                    {show.show2 ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Button type="submit" size="lg" variant="solid" colorScheme="brand">
              Create Account
            </Button>
          </Stack>
        </Box>
      </Center>
    </form>
  );
};
