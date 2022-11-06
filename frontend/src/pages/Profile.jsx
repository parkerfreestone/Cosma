import { Avatar, Box, Center, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import React from 'react'

export const Profile = () => {
  return (
    <Center>
        <Box maxW="3xl" w="100%" borderWidth="1px" borderRadius="lg" p={6}>
            <Flex alignItems="center" justifyContent="start">
            <Avatar size='xl' colorScheme="brand" marginEnd={6} name='Parker Freestone' />
            <Stack>
                <Heading size="lg">Username</Heading>
                <Heading size="sm" color="gray.600">Joined Nov 23 2022</Heading>
            </Stack>
            </Flex>
            <Text mt={6}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut repellendus voluptates possimus saepe laudantium molestias iste, dolorum consequuntur necessitatibus officiis laboriosam unde quis recusandae dolor debitis alias! Nobis, ipsum quam.</Text>
        </Box>
    </Center>
  )
}
