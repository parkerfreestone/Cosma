import React, { useState } from "react";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
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
import { Lock, User } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useAuthContext } from "../../context/UserContext";

const requestLogin = async (credentials) => {
  return await axios.post("/api/users/login", credentials);
};

export const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [show, setShow] = useState(false);

  const { setSignedIn, setUserId, setSessionOver } = useAuthContext();

  const navigate = useNavigate();

  const { mutate } = useMutation(requestLogin, {
    onSuccess: (data) => {
      setSignedIn(true);
      setUserId(data.data.id);
      setSessionOver(new Date(data.data.expiration));

      navigate(`/profile/${data.data.id}`);
    },
    onError: (err) => {
      setErrorMessage(err.response.data.message);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        mutate(formData);
      }}
    >
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        width="100%"
      >
        <Box maxW="3xl" w="100%" borderWidth="1px" borderRadius="lg" p={6}>
          <Stack gap={2}>
            <Heading size="lg">Login</Heading>

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

            <Button type="submit" size="lg" variant="solid" colorScheme="brand">
              Login
            </Button>
          </Stack>
        </Box>
        <Text marginTop={3}>
          Can't log in?{" "}
          <Link
            as={RouterLink}
            to="/auth/register"
            color="purple.600"
            fontWeight={900}
          >
            Create an account here
          </Link>
        </Text>
      </Flex>
    </form>
  );
};
