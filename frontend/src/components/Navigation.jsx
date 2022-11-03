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
import { Link } from "react-router-dom";

const menuItems = [
  {
    name: "Explore",
    route: "/",
    icon: <Compass />,
  },
  {
    name: "New Post",
    route: "/new-post",
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
  const [signedIn, setSignedIn] = useState(false);

  const handleLogIn = () => {
    setSignedIn(true);
    console.log("Logged in!");
  };

  const handleLogout = () => {
    setSignedIn(false);
    console.log("Logged out!");
  };

  return (
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
        <Link to="/">
          <HStack>
            <Rocket color="#e0aaff" size={32} />
            <Text fontSize="2xl" color="white" fontWeight="bold">
              COSMA
            </Text>
          </HStack>
        </Link>
        <Box
          display={{ base: isOpen ? "block" : "none", md: "block" }}
          flexBasis={{ base: "100%", md: "auto" }}
        >
          <Stack
            spacing={8}
            align="center"
            justify={["center", "space-between", "flex-end", "flex-end"]}
            direction={["column", "row", "row", "row"]}
            pt={[4, 4, 0, 0]}
          >
            {menuItems.map(({ name, route, icon }) =>
              name !== "Profile" ? (
                <Link key={name} to={route}>
                  <IconButton
                    variant="link"
                    color="white"
                    aria-label={name}
                    icon={icon}
                  />
                </Link>
              ) : (
                <Menu key={name}>
                  <Link>
                    <MenuButton
                      as={IconButton}
                      aria-label={name}
                      variant="link"
                      color="white"
                      icon={icon}
                    />
                  </Link>
                  <MenuList>
                    {signedIn ? (
                      <>
                        <Link to="/profile">
                          <MenuItem icon={<User />}>Profile</MenuItem>
                        </Link>
                        <Link to="/profile">
                          <MenuItem icon={<Settings />}>Settings</MenuItem>
                        </Link>
                        <MenuDivider />
                        <MenuItem onClick={handleLogout} icon={<LogOut />}>
                          Log Out
                        </MenuItem>
                      </>
                    ) : (
                      <>
                        <MenuItem onClick={handleLogIn} icon={<LogIn />}>
                          Log In
                        </MenuItem>
                        <MenuItem icon={<UserPlus />}>Register</MenuItem>
                      </>
                    )}
                  </MenuList>
                </Menu>
              )
            )}
          </Stack>
          <Box
            display={{ base: "block", md: "none" }}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </Box>
        </Box>
      </Flex>
    </Center>
  );
};
