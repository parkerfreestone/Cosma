import { useState } from "react";
import {
  Box,
  Center,
  Flex,
  HStack,
  IconButton,
  Stack,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Link,
} from "@chakra-ui/react";
import {
  Compass,
  LogIn,
  LogOut,
  PlusSquare,
  Rocket,
  Settings,
  User,
  UserPlus,
  X,
} from "lucide-react";
import { Link as RouterLink, Navigate, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/UserContext";
import { NewPostModal } from "./NewPostModal";

const menuItems = [
  {
    name: "Explore",
    route: "/",
    icon: <Compass />,
  },
  {
    name: "New Post",
    icon: <PlusSquare />,
  },
  {
    name: "Profile",
    route: "/profile",
    icon: <User />,
  },
];

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { signedIn, setSignedIn, setUserId, userId, setSessionOver } =
    useAuthContext();
  const [postModalIsOpen, setPostModalIsOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogout = async () => {
    fetch("/api/users/logout", {
      method: "GET",
      credentials: "same-origin",
    }).then(() => {
      setSignedIn(false);
      setUserId(null);
      setSessionOver(new Date());
      navigate("/auth/login");
    });
  };

  return (
    <>
      <Center as="nav" bg="brand.900" mb={5}>
        <Flex
          align="center"
          justify="space-between"
          wrap="wrap"
          w="100%"
          paddingTop={7}
          paddingBottom={7}
          maxW="3xl"
        >
          <Link as={RouterLink} to="/">
            <HStack>
              <Rocket color="#e0aaff" size={32} />
              <Text fontSize="2xl" color="white" fontWeight="bold">
                COSMA
              </Text>
            </HStack>
          </Link>
          <Box flexBasis={{ base: "100%", md: "auto" }}>
            <Stack
              spacing={8}
              align="center"
              justify={["center", "space-between", "flex-end", "flex-end"]}
              direction={["column", "row", "row", "row"]}
              pt={[4, 4, 0, 0]}
            >
              <Link as={RouterLink} to={"/"}>
                <IconButton
                  variant="link"
                  color="white"
                  aria-label={"Compass"}
                  icon={<Compass />}
                />
              </Link>
              {/* KEEP THE LINK FOR STYLING */}
              <Link as={RouterLink}>
                <IconButton
                  variant="link"
                  color="white"
                  aria-label={"Compass"}
                  icon={<PlusSquare />}
                  onClick={() => {
                    signedIn ? (
                      setPostModalIsOpen(true)
                    ) : (
                      <Navigate to="/auth/login" replace />
                    );
                  }}
                />
              </Link>

              <Menu key={"profile-menu"}>
                <Link as={RouterLink}>
                  <MenuButton
                    as={IconButton}
                    aria-label={"profile-menu"}
                    variant="link"
                    color="white"
                    icon={<User />}
                  />
                </Link>
                <MenuList>
                  {signedIn ? (
                    <>
                      <Link as={RouterLink} to={`/profile/${userId}`}>
                        <MenuItem icon={<User />}>Profile</MenuItem>
                      </Link>
                      <MenuDivider />
                      <MenuItem icon={<LogOut />} onClick={handleLogout}>
                        Log Out
                      </MenuItem>
                    </>
                  ) : (
                    <>
                      <Link as={RouterLink} to="/auth/login">
                        <MenuItem icon={<LogIn />}>Log In</MenuItem>
                      </Link>
                      <Link as={RouterLink} to="/auth/register">
                        <MenuItem icon={<UserPlus />}>Register</MenuItem>
                      </Link>
                    </>
                  )}
                </MenuList>
              </Menu>
            </Stack>
            <Box onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X /> : <Menu />}
            </Box>
          </Box>
        </Flex>
      </Center>

      <NewPostModal isOpen={postModalIsOpen} setIsOpen={setPostModalIsOpen} />
    </>
  );
};
