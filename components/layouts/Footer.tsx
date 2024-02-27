import {
  Box,
  Flex,
  Container,
  Link,
  chakra,
  Select,
} from "@chakra-ui/react";
import { AiFillGithub } from "react-icons/ai";
import { useTranslation } from "react-i18next";
import CommunityLogo from "../svgs/CommunityLogo";
import GitBook from "../svgs/GitBook";
import { StyledTooltip } from "components/shared/StyledTooltip";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <Box
      px={{ base: 0, md: 4 }}
      pb={4}
      top={"0"}
      zIndex={100}
      bg={"#fcfaf2"}
      opacity={0.975}
    >
      <Container maxW="container.2xl" px={{ base: 2, md: 4 }}>
        <Flex py="4" justifyContent="space-between" alignItems="center">
          <chakra.div flex={1}></chakra.div>
          <Flex
            flex={2}
            py="4"
            gridGap={4}
            justifyContent="center"
            alignItems="center"
          >
            <StyledTooltip labelKey="DeFiGeek Community JAPAN">
              <Link
                href="https://defigeek.xyz/"
                target={"_blank"}
                fontSize={"3xl"}
                _hover={{ opacity: 0.8 }}
              >
                <CommunityLogo width="2.5rem" height="2.5rem" fill="#818181" />
              </Link>
            </StyledTooltip>
            <StyledTooltip labelKey="GitHub">

              <Link
                href="https://github.com/DeFiGeek-Community/"
                target={"_blank"}
                fontSize={"3xl"}
                _hover={{ opacity: 0.8 }}
                padding={"0.3125rem"}
              >
                <AiFillGithub fill="#818181" />
              </Link>
            </StyledTooltip>
            <StyledTooltip labelKey="GitBook">
              <Link
                href="https://docs.yamato.fi"
                target={"_blank"}
                fontSize={"3xl"}
                _hover={{ opacity: 0.8 }}
                padding={"0.3125rem"}
              >
                <GitBook width="2.5rem" height="2.5rem" fill="#818181" />
              </Link>
            </StyledTooltip>
          </Flex>
          <Box flex={1}>
            <Select
              w={"100px"}
              size={"xs"}
              value={"ja"}
              onChange={(e) => console.log("change", e.target.value)}
              float={"right"}
              placeholder="言語"
            >
              {/* <option value={"ja"}>日本語</option>
              <option value={"en"}>English</option> */}
            </Select>
          </Box>
        </Flex>
        <Flex justifyContent={"center"} fontSize={"sm"}>
          © DeFiGeek Community JAPAN
        </Flex>
      </Container>
    </Box>
  );
}
