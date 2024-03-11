import { Box, Container, Flex, Link, HStack } from "@chakra-ui/react";
import SvgYamatoLogWithTitle from "../svgs/YamatoLogo";

type HeaderProps = {
  title?: string;
};

export default function Header({ title }: HeaderProps) {
  return (
    <Box
      px={{ base: 0, md: 4 }}
      position={"sticky"}
      top={"0"}
      zIndex={100}
      bg={"#fcfaf2"}
      opacity={0.975}
    >
      <Container maxW="container.2xl" px={{ base: 2, md: 4 }}>
        <Flex
          as="header"
          py="4"
          justifyContent="space-between"
          alignItems="center"
        >
          <HStack>
            <Link href="/">
              <SvgYamatoLogWithTitle width={200} height={30} />
            </Link>
          </HStack>
          <HStack spacing={{ base: 2, md: 4 }}>
            <w3m-button balance={"hide"} />
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
}
