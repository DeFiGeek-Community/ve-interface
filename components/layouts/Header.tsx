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
  MenuDivider,
  Button,
} from "@chakra-ui/react";
import Image from "next/image";
import { HamburgerIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { useAccount } from "wagmi";
import { useContractContext } from "lib/contexts/ContractContext";
import { environmentConfig } from "lib/constants/config";
import { useRouter } from "next/router";

export default function Header() {
  const { chain } = useAccount();
  const { config } = useContractContext();
  const themeColors = config.themeColors;
  const [isLessThan700px] = useMediaQuery("(max-width: 800px)");
  const router = useRouter();

  // 動的に画像のパスを設定
  const logoSrc = config ? `/${config.projectLogoPath}` : null;

  const tokens = Object.keys(environmentConfig).map((env) => ({
    name: environmentConfig[env][1].veTokenName,
    path: environmentConfig[env][1].path,
  }));

  return (
    <Box
      px={{ base: 0, md: 4 }}
      position={"sticky"}
      top={"0"}
      zIndex={100}
      bg={themeColors.backgroundColor}
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
              <MenuList bg={themeColors.backgroundColor}>
                <MenuItem
                  as={Link}
                  href={config.homeUrl}
                  bg={themeColors.backgroundColor}
                >
                  HOME
                </MenuItem>
                <MenuDivider />
                {tokens.map((token) => (
                  <MenuItem
                    key={token.name}
                    as={Link}
                    href={token.path}
                    bg={themeColors.backgroundColor}
                    style={{
                      pointerEvents:
                        token.name === config.veTokenName ? "none" : "auto",
                      opacity: token.name === config.veTokenName ? 0.6 : 1,
                    }}
                  >
                    {token.name}
                  </MenuItem>
                ))}
                <MenuDivider />
                <MenuItem
                  as={Link}
                  href={`${config.path}/weight/`}
                  bg={themeColors.backgroundColor}
                >
                  Vote weight
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <HStack spacing={6}>
              <Link href="/">
                {logoSrc && (
                  <Image src={logoSrc} alt="Logo" width={200} height={30} />
                )}
              </Link>
              <Link
                href={config.homeUrl}
                _hover={{ textDecoration: "none" }}
                ml={2}
              >
                <Text fontWeight="bold">Home</Text>
              </Link>
              <Menu>
                <MenuButton
                  as={Button}
                  ml={2}
                  variant="link"
                  _hover={{ textDecoration: "none" }}
                >
                  <Text fontWeight="bold">
                    {"ve Token"}
                    <ChevronDownIcon />
                  </Text>
                </MenuButton>
                <MenuList>
                  {tokens.map((token) => (
                    <MenuItem
                      key={token.name}
                      onClick={() => router.push(token.path)}
                    >
                      {token.name}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
              {config.vote && (
                <Link
                  href={`${config.path}/weight/`}
                  _hover={{ textDecoration: "none" }}
                >
                  <Text fontWeight="bold">Vote</Text>
                </Link>
              )}
            </HStack>
          )}
          <HStack ml={2}>
            {chain && <w3m-network-button />}
            <w3m-button balance={"hide"} />
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
}
