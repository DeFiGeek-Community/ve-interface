import {
  Box,
  Container,
  Flex,
  Link,
  HStack,
  useMediaQuery,
} from "@chakra-ui/react";
import { useAccount } from "wagmi";
import SvgYamatoLogWithTitle from "../svgs/YamatoLogo";

export default function Header() {
  const { chain } = useAccount();
  const [isLessThan520px] = useMediaQuery("(max-width: 520px)");

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
            {!isLessThan520px && (
              <Link href="/">
                <SvgYamatoLogWithTitle width={200} height={30} />
              </Link>
            )}
          </HStack>
          <HStack>
            {chain && <w3m-network-button />}
            <w3m-button balance={"hide"} />
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
}
