import React, { useState } from "react";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { Lock, Mail, User } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const createUser = async (newUser) => {
  delete newUser.confirmPassword;
  return await axios.post("/api/users", newUser);
};

export const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [show, setShow] = useState({
    show1: false,
    show2: false,
  });

  const navigate = useNavigate();

  const { mutate } = useMutation(createUser, {
    onSuccess: () => {
      navigate("/auth/login");
    },
    onError: (err) => {
      setErrorMessage(err.response.data.message);
    },
  });

  useEffect(() => {
    formData.password === formData.confirmPassword
      ? setErrorMessage(null)
      : setErrorMessage("Passwords do not match.");
  }, [formData.confirmPassword, formData.password]);

  return (
    <>
      <Center></Center>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          mutate(formData);
        }}
      >
        <Flex direction="column" alignItems="center" justifyContent="center">
          <Box maxW="3xl" w="100%" borderWidth="1px" borderRadius="lg" p={6}>
            <Stack gap={2}>
              <Heading size="lg">Register</Heading>

              <Divider />

              {errorMessage ? (
                <Alert status="error" variant="left-accent">
                  <AlertIcon />
                  {errorMessage}
                </Alert>
              ) : null}

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
                  <InputLeftElement
                    pointerEvents="none"
                    children={<Lock color="gray" />}
                  />
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
                  <InputLeftElement
                    pointerEvents="none"
                    children={<Lock color="gray" />}
                  />
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
              <Button
                type="submit"
                size="lg"
                variant="solid"
                colorScheme="brand"
              >
                Create Account
              </Button>
            </Stack>
          </Box>
          <Text marginTop={3}>
            Already have an account?{" "}
            <Link
              as={RouterLink}
              to="/auth/login"
              color="purple.600"
              fontWeight={900}
            >
              Log in
            </Link>
          </Text>
        </Flex>
      </form>
    </>
  );
};
