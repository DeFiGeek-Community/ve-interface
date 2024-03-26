import {
  Box,
  Container,
  Flex,
  Link,
  HStack,
  useMediaQuery,
  Text,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useAccount } from "wagmi";
import SvgYamatoLogWithTitle from "../svgs/YamatoLogo";

export default function Header() {
  const { chain } = useAccount();
  const [isLessThan700px] = useMediaQuery("(max-width: 700px)");

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
          {isLessThan700px ? (
            <Menu>
              <MenuButton
                as={IconButton}
                icon={<HamburgerIcon />}
                variant="outline"
                aria-label="Options"
              />
              <MenuList bg="#fcfaf2">
                <MenuItem as={Link} href="https://app.yamato.fi/#/" >
                  HOME
                </MenuItem>
                <MenuItem
                  as={Link}
                  href="/"
                  style={{ pointerEvents: "none", opacity: 0.6 }}
                >
                  veYMT
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <HStack spacing={6}>
              <Link href="/">
                <SvgYamatoLogWithTitle width={200} height={30} />
              </Link>
              <Link
                href="https://app.yamato.fi/#/"
                _hover={{ textDecoration: "none" }}
                ml={4}
              >
                <Text fontWeight="bold">HOME</Text>
              </Link>
              <Link
                href="/"
                _hover={{ textDecoration: "none" }}
                style={{ pointerEvents: "none", opacity: 0.6 }}
              >
                <Text fontWeight="bold">veYMT</Text>
              </Link>
            </HStack>
          )}
          <HStack>
            {chain && <w3m-network-button />}
            <w3m-button balance={"hide"} />
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
}
