import { Box, Flex, Button, useDisclosure, Image } from '@chakra-ui/react';

import { ModalAddImage } from './Modal/AddImage';

export function Header(): JSX.Element {
  const { onOpen, isOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bgColor="pGray.800" minWidth='max-content'>
        <Flex
          justifyContent="space-between"
          alignItems="center"
          maxW={1120}
          mx="auto"
          px={5}
          py={6}
          gap='2'
        >
          <Image minWidth={100} src="logo.svg" h={10} />
          <Button minWidth={164} onClick={() => onOpen()}>Adicionar imagem</Button>
        </Flex>
      </Box>

      <ModalAddImage isOpen={isOpen} onClose={onClose} />
    </>
  );
}
