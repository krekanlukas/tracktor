import { Flex, Image } from '@chakra-ui/react';

import tractor from '@/assets/tractor.png';

export const LandingPage = () => {
  return (
    <Flex>
      <Image src={tractor} alt="tractor logo" />
    </Flex>
  );
};
