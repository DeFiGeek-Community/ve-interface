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
          py="3"
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
                  Home
                </MenuItem>
                {config.tokenName === "YMT" && (
                  <MenuItem
                    as={Link}
                    href={`${config.homeUrl}tools/`}
                    bg={themeColors.backgroundColor}
                  >
                    Tool
                  </MenuItem>
                )}
                <MenuDivider />
                <MenuItem
                  as={Link}
                  href={`${config.path}`}
                  bg={themeColors.backgroundColor}
                  style={{
                    pointerEvents:
                      router.asPath === `${config.path}` ? "none" : "auto",
                    opacity: router.asPath === `${config.path}` ? 0.6 : 1,
                  }}
                >
                  {config.veTokenName}
                </MenuItem>
                <MenuItem
                  as={Link}
                  href={`${config.path}/weight`}
                  bg={themeColors.backgroundColor}
                  style={{
                    pointerEvents:
                      router.asPath === `${config.path}/weight`
                        ? "none"
                        : "auto",
                    opacity:
                      router.asPath === `${config.path}/weight` ? 0.6 : 1,
                  }}
                >
                  Vote
                </MenuItem>
                <MenuDivider />
                {tokens
                  .filter((token) => token.name !== config.veTokenName)
                  .map((token) => (
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

              {config.tokenName === "YMT" && (
                <Link
                  href={`${config.homeUrl}tools/`}
                  _hover={{ textDecoration: "none" }}
                >
                  <Text fontWeight="bold">Tool</Text>
                </Link>
              )}
              <Link
                href={`${config.path}`}
                _hover={{ textDecoration: "none" }}
                style={{
                  pointerEvents:
                    router.asPath === config.path ? "none" : "auto",
                  opacity: router.asPath === config.path ? 0.6 : 1,
                }}
              >
                <Text fontWeight="bold">{config.veTokenName}</Text>
              </Link>
              {config.vote && (
                <Link
                  href={`${config.path}/weight`}
                  _hover={{ textDecoration: "none" }}
                  style={{
                    pointerEvents:
                      router.asPath === `${config.path}/weight`
                        ? "none"
                        : "auto",
                    opacity:
                      router.asPath === `${config.path}/weight` ? 0.6 : 1,
                  }}
                >
                  <Text fontWeight="bold">Vote</Text>
                </Link>
              )}
              <Menu>
                <MenuButton
                  as={Button}
                  variant="link"
                  _hover={{ textDecoration: "none" }}
                >
                  <Text fontWeight="bold">
                    {"ve Token"}
                    <ChevronDownIcon />
                  </Text>
                </MenuButton>
                <MenuList>
                  {tokens
                    .filter((token) => token.name !== config.veTokenName)
                    .map((token) => (
                      <MenuItem
                        key={token.name}
                        onClick={() => router.push(token.path)}
                      >
                        {token.name}
                      </MenuItem>
                    ))}
                </MenuList>
              </Menu>
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
