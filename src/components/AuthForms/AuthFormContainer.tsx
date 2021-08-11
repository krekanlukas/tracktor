import { Flex, Heading, Link, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';

type AuthFormContainerProps = {
  children?: ReactNode;
  heading?: string;
  link?: {
    message?: string;
    to: string;
    title: string;
  };
};

export const AuthFormContainer = ({ children, heading, link }: AuthFormContainerProps) => {
  console.log('AuthFormContainer render');
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      m="auto"
      px={{ base: 8, md: 16 }}
      py={8}
      w="full"
      maxW="md"
      borderWidth="2px"
      borderRadius="lg"
      boxShadow="xl"
    >
      <Heading mb={8}>{heading}</Heading>
      <Text mb={link && 8}>
        {link?.message}
        {link && (
          <Link as={RouterLink} to={link.to} color="teal" ml={1}>
            {link?.title}
          </Link>
        )}
      </Text>
      {children}
    </Flex>
  );
};
