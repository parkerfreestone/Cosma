import { Avatar, Box, Button, Center, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import { Edit } from 'lucide-react'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useAuthContext } from '../context/UserContext'

export const Profile = () => {
  const [userData, setUserData] = useState({username: "", email: "", bio: ""})
  const { userId } = useAuthContext();

  useEffect(() => {
    if (userId) {
      fetch(`/api/users/${userId}`, { 
        method: "GET",
      })
      .then((response) => response.json())
      .then((profileJsonPayload) => setUserData(profileJsonPayload))
      .catch(() => alert("There was an error fetching your profile..."))
    }
  }, [userId])

  return (
    <Center>
        <Box maxW="3xl" w="100%" borderWidth="1px" borderRadius="lg" p={6}>
            <Flex alignItems="center" justifyContent="start">
              <Avatar size='xl' colorScheme="brand" marginEnd={6} name={userData?.username} />
              <Stack marginBottom={5}>
                  <Heading size="lg">{userData?.username}</Heading>
                  <Heading size="sm" color="gray.600">Joined {new Date(userData.createdDate).toDateString()}</Heading>
              </Stack>
            </Flex>
            {userData.bio ? userData.bio : (
              <>
                <Button leftIcon={<Edit />} size="sm" >Edit Bio</Button>
                <Text>It seems like you don't have a bio.</Text>
              </>
            )}
        </Box>
    </Center>
  )
}
